import React, { useState } from 'react';
import { MechanicaButton } from '../ui/mechanicaButton';
import { MechanicaCard } from '../ui/mechanicaCard';
import { MechanicaGear } from '../ui/mechanicaGear';

// Define expected structure for a question
interface VarkQuestion {
  id: string;
  question_text: string;
  options: {
    text: string;
    style: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  }[];
}

// Define expected structure for the assessment result
interface VarkAssessmentResult {
  primary_vark_preference: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  vark_profile_data: {
    visual: number;
    aural: number;
    read_write: number;
    kinesthetic: number;
  };
  assessment_version: string;
  total_duration: number;
  confidence_metrics: Record<string, number>;
}

const MOCK_QUESTIONS: VarkQuestion[] = [
  {
    id: 'q1',
    question_text: 'When you are learning a new physical skill, you prefer to:',
    options: [
      { text: 'Watch someone perform it first', style: 'visual' },
      { text: 'Listen to an explanation of the steps', style: 'aural' },
      { text: 'Read a manual or diagrams', style: 'read_write' },
      { text: 'Just start practicing and figure it out', style: 'kinesthetic' },
    ],
  },
  {
    id: 'q2',
    question_text: 'When you are trying to remember a difficult concept, you:',
    options: [
      { text: 'Create a mental map or flowchart', style: 'visual' },
      { text: 'Discuss it with someone else', style: 'aural' },
      { text: 'Write notes or summarize the key points', style: 'read_write' },
      {
        text: 'Build a physical model or relate it to a real-world task',
        style: 'kinesthetic',
      },
    ],
  },
  {
    id: 'q3',
    question_text:
      'If you are looking for directions to a new place, you prefer:',
    options: [
      { text: 'Following a map on your phone', style: 'visual' },
      { text: 'Asking someone for verbal directions', style: 'aural' },
      { text: 'Reading a list of written steps', style: 'read_write' },
      {
        text: 'Driving around until you find a landmark',
        style: 'kinesthetic',
      },
    ],
  },
  {
    id: 'q4',
    question_text: 'When choosing a restaurant, you are most influenced by:',
    options: [
      { text: 'Photos of the food on social media', style: 'visual' },
      { text: 'Recommendations from friends', style: 'aural' },
      { text: 'Reading reviews and the menu', style: 'read_write' },
      { text: 'The atmosphere and comfort of the space', style: 'kinesthetic' },
    ],
  },
];

const VarkAssessment: React.FC<{
  userId: string;
  isDemo?: boolean;
  onComplete: (result: VarkAssessmentResult) => void;
}> = ({ userId, isDemo, onComplete }) => {
  // Intentionally unused - reserved for future API integration
  void userId;
  void isDemo;
  const [answers, setAnswers] = useState<
    Record<string, 'visual' | 'aural' | 'read_write' | 'kinesthetic'>
  >({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Use local questions directly
  const questions = MOCK_QUESTIONS;

  const handleAnswerChange = (
    questionId: string,
    style: 'visual' | 'aural' | 'read_write' | 'kinesthetic'
  ) => {
    setAnswers(prev => ({ ...prev, [questionId]: style }));
  };

  const calculateResult = (): VarkAssessmentResult => {
    const scores = {
      visual: 0,
      aural: 0,
      read_write: 0,
      kinesthetic: 0,
    };

    Object.values(answers).forEach(style => {
      scores[style]++;
    });

    const primaryStyle = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as 'visual' | 'aural' | 'read_write' | 'kinesthetic';

    return {
      primary_vark_preference: primaryStyle,
      vark_profile_data: scores,
      assessment_version: '1.0-client',
      total_duration: 0, // Could track if needed
      confidence_metrics: { consistency: 0.95 },
    };
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate mechanical analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = calculateResult();
    onComplete(result);
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <MechanicaCard variant="mechanical" className="p-6 text-center">
        <p className="mechanica-text-technical">No VARK questions available.</p>
      </MechanicaCard>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;

  return (
    <MechanicaCard variant="mechanical" className="p-6">
      <h2 className="text-2xl font-bold mb-4 mechanica-heading-professional">
        Discover Your Learning Style
      </h2>
      <p className="mb-6 text-gray-600 mechanica-text-technical">
        Answer the following questions to help us understand how you learn best.
        ({currentQuestionIndex + 1}/{questions.length})
      </p>

      {isAnalyzing && (
        <MechanicaCard
          variant="wood"
          className="p-4 mb-4 border-indigo-300 bg-indigo-50"
        >
          <div className="flex items-center space-x-3">
            <MechanicaGear size="small" color="brass" speed="fast" />
            <p className="text-indigo-700 mechanica-text-technical">
              Analyzing behavioral patterns...
            </p>
          </div>
        </MechanicaCard>
      )}

      <div className="mb-6">
        <p className="font-semibold mb-2 mechanica-text-technical">
          {currentQuestion.question_text}
        </p>
        <div className="space-y-2">
          {currentQuestion.options.map(opt => (
            <label
              key={opt.style}
              className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer mechanica-text-technical"
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={opt.style}
                checked={answers[currentQuestion.id] === opt.style}
                onChange={() =>
                  handleAnswerChange(currentQuestion.id, opt.style)
                }
                className="mr-2 h-4 w-4 text-mechanica-moonlight-blue border-gray-300 focus:ring-mechanica-moonlight-blue"
              />
              {opt.text}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <MechanicaButton
          variant="wood"
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion || isAnalyzing}
        >
          Previous
        </MechanicaButton>
        {isLastQuestion ? (
          <MechanicaButton
            variant="mechanical"
            onClick={handleSubmit}
            disabled={isAnalyzing || !hasAnsweredCurrentQuestion}
          >
            {isAnalyzing ? 'Processing...' : 'Complete Assessment'}
          </MechanicaButton>
        ) : (
          <MechanicaButton
            variant="mechanical"
            onClick={handleNextQuestion}
            disabled={!hasAnsweredCurrentQuestion || isAnalyzing}
          >
            Next Question
          </MechanicaButton>
        )}
      </div>
    </MechanicaCard>
  );
};

export default VarkAssessment;
