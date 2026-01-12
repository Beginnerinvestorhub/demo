import React, { useState } from 'react';
import { useApiGet, useApiPost } from '../../hooks/useApi'; // Assuming useApi is in ../../hooks/useApi
import { MechanicaButton } from '../ui/mechanicaButton';
import { MechanicaCard } from '../ui/mechanicaCard';
import { MechanicaGear } from '../ui/mechanicaGear';

// Define expected structure for a question
interface VarkQuestion {
  id: string;
  question_text: string;
  options: { text: string; style: 'visual' | 'aural' | 'read_write' | 'kinesthetic' }[];
}

// Define expected structure for the assessment payload
interface VarkAssessmentPayload {
  user_id: string;
  assessment_responses: Array<{
    question_id: string;
    selected_style: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  }>;
  // Add other fields from VarkAssessmentPayload as needed (e.g., assessment_version)
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

const VarkAssessment: React.FC<{ userId: string; onComplete: (result: VarkAssessmentResult) => void }> = ({ userId, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Changed key to string for question ID
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch questions using useApiGet
  const { data: questions, loading: questionsLoading, error: questionsError } = useApiGet<VarkQuestion[]>('/api/v1/learning/vark/questions', { autoFetch: true });

  // Post assessment using useApiPost
  const { post, loading: submitLoading, error: submitError } = useApiPost<VarkAssessmentResult, VarkAssessmentPayload>('/api/v1/learning/vark/assess');

  const handleAnswerChange = (questionId: string, style: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: style }));
  };

  const handleSubmit = async () => {
    if (!questions || Object.keys(answers).length !== questions.length) {
      // setError('Please answer all questions.'); // Will handle this with UI feedback later
      return;
    }

    const assessment_responses = questions.map(q => ({
      question_id: q.id,
      selected_style: answers[q.id] as 'visual' | 'aural' | 'read_write' | 'kinesthetic',
    }));

    try {
      const result = await post({ user_id: userId, assessment_responses });
      if (result) {
        onComplete(result);
      }
    } catch (err) {
      console.error('VARK assessment submission failed:', err);
      // setError('Failed to submit assessment. Please try again.'); // Error from hook will be propagated
    }
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

  if (questionsLoading) {
    return (
      <MechanicaCard variant="mechanical" className="p-6 text-center">
        <MechanicaGear size="large" color="steel" speed="slow" className="mx-auto mb-4" />
        <p className="mechanica-text-technical">Loading VARK questions...</p>
      </MechanicaCard>
    );
  }

  if (questionsError) {
    return (
      <MechanicaCard variant="mechanical" className="p-6 text-center">
        <MechanicaGear size="large" color="copper" speed="fast" className="mx-auto mb-4" />
        <p className="text-red-600 mechanica-text-technical">Error loading questions: {questionsError}</p>
        <MechanicaButton variant="mechanical" onClick={() => window.location.reload()} className="mt-4">
          Retry
        </MechanicaButton>
      </MechanicaCard>
    );
  }

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
      <h2 className="text-2xl font-bold mb-4 mechanica-heading-professional">Discover Your Learning Style</h2>
      <p className="mb-6 text-gray-600 mechanica-text-technical">
        Answer the following questions to help us understand how you learn best. ({currentQuestionIndex + 1}/{questions.length})
      </p>

      {submitError && (
        <MechanicaCard variant="wood" className="p-4 mb-4 border-red-300 bg-red-50">
          <p className="text-red-700 mechanica-text-technical">Error submitting assessment: {submitError}</p>
        </MechanicaCard>
      )}

      <div className="mb-6">
        <p className="font-semibold mb-2 mechanica-text-technical">{currentQuestion.question_text}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((opt) => (
            <label key={opt.style} className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer mechanica-text-technical">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={opt.style}
                checked={answers[currentQuestion.id] === opt.style}
                onChange={() => handleAnswerChange(currentQuestion.id, opt.style)}
                className="mr-2 h-4 w-4 text-mechanica-moonlight-blue border-gray-300 focus:ring-mechanica-moonlight-blue"
              />
              {opt.text}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <MechanicaButton variant="wood" onClick={handlePreviousQuestion} disabled={isFirstQuestion || submitLoading}>
          Previous
        </MechanicaButton>
        {isLastQuestion ? (
          <MechanicaButton
            variant="mechanical"
            onClick={handleSubmit}
            disabled={submitLoading || !hasAnsweredCurrentQuestion}
          >
            {submitLoading ? 'Analyzing...' : 'Submit Assessment'}
          </MechanicaButton>
        ) : (
          <MechanicaButton
            variant="mechanical"
            onClick={handleNextQuestion}
            disabled={!hasAnsweredCurrentQuestion || submitLoading}
          >
            Next Question
          </MechanicaButton>
        )}
      </div>
    </MechanicaCard>
  );
};

export default VarkAssessment;
