import React, { useState } from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaButton } from '../components/ui/mechanicaButton';

interface VARKQuestion {
  id: number;
  question: string;
  options: {
    visual: string;
    aural: string;
    readWrite: string;
    kinesthetic: string;
  };
}

const varkQuestions: VARKQuestion[] = [
  {
    id: 1,
    question: "When you learn new investment concepts, you prefer:",
    options: {
      visual: "Watching videos and seeing charts/diagrams",
      aural: "Listening to podcasts or explanations",
      readWrite: "Reading detailed articles and taking notes",
      kinesthetic: "Hands-on practice with simulations"
    }
  },
  {
    id: 2,
    question: "When understanding market data, you find it easiest to:",
    options: {
      visual: "See visual representations and graphs",
      aural: "Have someone explain the trends",
      readWrite: "Read written analysis and reports",
      kinesthetic: "Manipulate the data yourself"
    }
  },
  {
    id: 3,
    question: "When remembering investment strategies, you tend to:",
    options: {
      visual: "Recall the visual layout and charts",
      aural: "Remember what was said or discussed",
      readWrite: "Recall the written notes and text",
      kinesthetic: "Remember the actions and practice sessions"
    }
  },
  {
    id: 4,
    question: "In investment education, you learn best when:",
    options: {
      visual: "Information is presented visually",
      aural: "Content is delivered through audio",
      readWrite: "Materials are text-based",
      kinesthetic: "You can actively participate"
    }
  },
  {
    id: 5,
    question: "When faced with complex financial problems, you:",
    options: {
      visual: "Draw diagrams to understand the relationships",
      aural: "Talk through the problem out loud",
      readWrite: "Write out the steps and logic",
      kinesthetic: "Work through examples physically"
    }
  },
  {
    id: 6,
    question: "If you need to research a new company, you would first:",
    options: {
      visual: "Look for price charts and infographics",
      aural: "Listen to the earnings call recording",
      readWrite: "Read the annual report (10-K)",
      kinesthetic: "Test their product or visit a store"
    }
  },
  {
    id: 7,
    question: "To track your portfolio performance, you prefer:",
    options: {
      visual: "Color-coded dashboards and heatmaps",
      aural: "Daily voice briefings or news commentary",
      readWrite: "Detailed spreadsheets or ledger entries",
      kinesthetic: "Adjusting positions and rebalancing manually"
    }
  },
  {
    id: 8,
    question: "When explaining investing to a friend, you would:",
    options: {
      visual: "Show them a graph of compound interest",
      aural: "Explain the concepts in a conversation",
      readWrite: "Send them a link to a good article",
      kinesthetic: "Help them set up an account"
    }
  },
  {
    id: 9,
    question: "You are most likely to trust financial advice if it is:",
    options: {
      visual: "Presented in a clear, professional presentation",
      aural: "Delivered by a speaker you resonate with",
      readWrite: "Backed by written citations and data",
      kinesthetic: "Proven to work in your own experience"
    }
  },
  {
    id: 10,
    question: "Your favorite way to verify a stock tip is to:",
    options: {
      visual: "Look for patterns in its technical chart",
      aural: "Ask other investors what they think",
      readWrite: "Read the latest news and analyst ratings",
      kinesthetic: "Buy a small amount to 'watch' it"
    }
  }
];

export default function VARKAssessmentPage() {
  const [step, setStep] = useState<number>(0); // 0=Profile, 1=Quiz, 2=Results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Profile State
  const [experience, setExperience] = useState('');
  const [ageGroup, setAgeGroup] = useState('');

  const handleAnswer = (learningStyle: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: learningStyle
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < varkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = {
      visual: 0,
      aural: 0,
      readWrite: 0,
      kinesthetic: 0
    };

    Object.values(answers).forEach(style => {
      if (style in scores) {
        scores[style as keyof typeof scores]++;
      }
    });

    const dominantStyle = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    return { scores, dominantStyle };
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setStep(0);
    setExperience('');
    setAgeGroup('');
  };

  if (step === 0) {
    return (
      <MechanicaLayout
        title="VARK Assessment Profile"
        description="Set up your profile to begin the assessment."
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <MechanicaGear size="xl" color="brass" speed="slow" className="mx-auto mb-6" />
                <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">
                  Investor <span className="text-blue-600">Profile</span>
                </h1>
                <p className="text-gray-600">Tell us a bit about yourself before we discover your learning style.</p>
              </div>

              <MechanicaCard variant="mechanical" animated className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Experience Level
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mechanica-moonlight-blue focus:ring-0 transition-all font-medium text-gray-700"
                    >
                      <option value="">Select Level...</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Age Group
                    </label>
                    <select
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mechanica-moonlight-blue focus:ring-0 transition-all font-medium text-gray-700"
                    >
                      <option value="">Select Age...</option>
                      <option value="18-24">18 - 24</option>
                      <option value="25-34">25 - 34</option>
                      <option value="35-44">35 - 44</option>
                      <option value="45-54">45 - 54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>

                  <div className="pt-6">
                    <MechanicaButton
                      variant="mechanical"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => setStep(1)}
                      disabled={!experience || !ageGroup}
                    >
                      Start Assessment
                    </MechanicaButton>
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  if (step === 2) {
    const { scores, dominantStyle } = calculateResults();
    const styleDescriptions = {
      visual: "You learn best through visual content like charts, graphs, and videos. Focus on investment platforms with strong visual analytics.",
      aural: "You prefer auditory learning through podcasts, discussions, and verbal explanations. Consider investment audio books and webinars.",
      readWrite: "You excel with text-based learning through articles, books, and note-taking. Prioritize written investment guides and research.",
      kinesthetic: "You learn best through hands-on experience and practice. Use investment simulators and interactive learning tools."
    };

    return (
      <MechanicaLayout
        title="VARK Assessment Results"
        description="Discover your learning style and get personalized investment education recommendations."
      >
        <Head>
          <title>VARK Assessment Results | BeginnerInvestorHub</title>
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <MechanicaGear size="xl" color="brass" speed="slow" />
                  <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">
                    Your Learning <span className="text-blue-600">Style</span>
                  </h1>
                  <MechanicaGear size="xl" color="brass" speed="reverse" />
                </div>
              </div>

              {/* Dominant Style */}
              <MechanicaCard variant="brass" animated className="mb-8">
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                    {dominantStyle} Learner
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {styleDescriptions[dominantStyle as keyof typeof styleDescriptions]}
                  </p>
                </div>
              </MechanicaCard>

              {/* Score Breakdown */}
              <MechanicaCard variant="mechanical" className="mb-8">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Object.entries(scores).map(([style, score]) => (
                      <div key={style} className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${style === dominantStyle ? 'text-blue-600' : 'text-gray-400'
                          }`}>
                          {score}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {style.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MechanicaCard>

              {/* Action Buttons */}
              <div className="text-center">
                <MechanicaButton
                  variant="mechanical"
                  size="lg"
                  onClick={reset}
                  className="px-8"
                >
                  Retake Assessment
                </MechanicaButton>
              </div>
            </div>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  const question = varkQuestions[currentQuestion];

  return (
    <MechanicaLayout
      title="VARK Assessment"
      description="Discover your learning style with our Visual, Auditory, Read/Write, and Kinesthetic assessment."
    >
      <Head>
        <title>VARK Assessment | BeginnerInvestorHub</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Assessment Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">
                  VARK <span className="text-blue-600">Assessment</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full">
                  <span className="text-blue-800 font-medium">
                    Question {currentQuestion + 1} of {varkQuestions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <MechanicaCard variant="wood" animated className="mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {question.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(question.options).map(([style, text]) => (
                    <button
                      key={style}
                      onClick={() => handleAnswer(style)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${answers[currentQuestion] === style
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${answers[currentQuestion] === style
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                          }`}>
                          {answers[currentQuestion] === style && (
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1 capitalize">
                            {style.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {text}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </MechanicaCard>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <MechanicaButton
                variant="mechanical"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="px-6"
              >
                Previous
              </MechanicaButton>

              <MechanicaButton
                variant="brass"
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
                className="px-6"
              >
                {currentQuestion === varkQuestions.length - 1 ? 'See Results' : 'Next'}
              </MechanicaButton>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
