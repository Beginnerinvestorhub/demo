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
        title="Investor DNA Initialization | BeginnerInvestorHub"
        description="Configure your investor profile and discover your precision learning style."
      >
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
            {/* Steam Vents for Hero */}
            <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-white/20 to-transparent mechanica-steam"></div>
            <div className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-white/20 to-transparent mechanica-steam" style={{ animationDelay: '1.5s' }}></div>
            {/* Mechanical background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.1) 40px, rgba(255, 255, 255, 0.1) 80px),
                    repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.05) 40px, rgba(255, 255, 255, 0.05) 80px)
                  `
                }}
              />
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <MechanicaGear size="xl" color="brass" speed="slow" />
                  <h1 className="text-4xl md:text-5xl lg:text-5xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome mechanica-float">
                    Investor <span className="text-yellow-400">Profile</span> Suite
                  </h1>
                  <MechanicaGear size="xl" color="brass" speed="reverse" />
                </div>

                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                  Initializing your technical investor profile. This assessment calibrates our AI teaching engine to match your cognitive learning style for maximum acquisition speed.
                </p>

                <div className="flex justify-center">
                  <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border border-yellow-500/30 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100/90">
                      PROTOCOL: Learning DNA Mapping
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
          </section>

          <div className="container mx-auto px-4 relative z-20 -mt-20 pb-20">
            <div className="max-w-2xl mx-auto">
              <MechanicaCard variant="mechanical" animated className="p-10 shadow-2xl bg-white/95 backdrop-blur-md border-t-4 border-t-mechanica-moonlight-blue">
                <div className="mb-8 border-b border-gray-100 pb-6 text-center">
                  <h3 className="text-2xl font-black text-mechanica-moonlight-blue uppercase tracking-tighter mb-2">Initialize Profile</h3>
                  <p className="text-sm text-gray-500 font-medium italic">Configure your baseline investor parameters</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Investor Experience Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setExperience(level.toLowerCase())}
                          className={`px-4 py-4 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${experience === level.toLowerCase()
                            ? 'bg-mechanica-moonlight-blue border-mechanica-moonlight-blue text-white shadow-lg scale-105'
                            : 'bg-white border-gray-100 text-gray-400 hover:border-mechanica-moonlight-blue/30'
                            }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Strategic Age Group
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {['18-24', '25-34', '35-44', '45-54', '55+'].map((age) => (
                        <button
                          key={age}
                          onClick={() => setAgeGroup(age)}
                          className={`py-3 rounded-lg border-2 transition-all font-black text-[10px] uppercase tracking-tight ${ageGroup === age
                            ? 'bg-mechanica-moonlight-blue border-mechanica-moonlight-blue text-white shadow-md'
                            : 'bg-white border-gray-100 text-gray-400 hover:border-mechanica-moonlight-blue/20'
                            }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <MechanicaButton
                      variant="mechanical"
                      size="lg"
                      className="w-full py-5 text-sm font-black uppercase tracking-[0.3em] shadow-xl hover:translate-y-[-2px] active:translate-y-[1px]"
                      onClick={() => setStep(1)}
                      disabled={!experience || !ageGroup}
                    >
                      Initialize Learning DNA Assessment <span className="ml-2">→</span>
                    </MechanicaButton>
                  </div>
                </div>
              </MechanicaCard>
            </div>

            {/* Educational Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Why it matters', text: 'Investing isn\'t one-size-fits-all. Your cognitive style determines how you process financial risk and market data.', icon: '🧠' },
                { title: 'AI Customization', text: 'VARK results allow our engine to serve content in the format you absorb best: visual charts or technical manuals.', icon: '⚙️' },
                { title: 'Long-term Growth', text: 'Aligning your education with your "Investor DNA" reduces cognitive load and accelerates your path to mastery.', icon: '📈' }
              ].map((info, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="text-3xl mb-4">{info.icon}</div>
                  <h4 className="text-sm font-black text-mechanica-moonlight-blue uppercase tracking-widest mb-3">{info.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{info.text}</p>
                </div>
              ))}
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

        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <MechanicaGear size="xl" color="brass" speed="slow" />
                  <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">
                    Your Learning <span className="text-mechanica-moonlight-blue">Style</span>
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
                        <div className={`text-3xl font-bold mb-2 ${style === dominantStyle ? 'text-mechanica-moonlight-blue' : 'text-gray-400'
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
                  VARK <span className="text-mechanica-moonlight-blue">Assessment</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <span className="text-mechanica-moonlight-blue font-bold uppercase tracking-widest text-sm">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(question.options).map(([style, text]) => (
                    <MechanicaCard
                      key={style}
                      variant={answers[currentQuestion] === style ? 'brass' : 'mechanical'}
                      className={`cursor-pointer transition-all ${answers[currentQuestion] === style ? 'ring-2 ring-amber-500 ring-offset-2' : 'hover:scale-[1.01]'}`}
                      onClick={() => handleAnswer(style)}
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${answers[currentQuestion] === style
                            ? 'border-amber-600 bg-amber-600'
                            : 'border-gray-300'
                            }`}>
                            {answers[currentQuestion] === style && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-mechanica-moonlight-blue uppercase tracking-widest text-xs mb-2">
                              {style.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-gray-900 font-medium">
                              {text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </MechanicaCard>
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
