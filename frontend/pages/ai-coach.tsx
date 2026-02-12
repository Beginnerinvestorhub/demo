import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaButton } from '../components/ui/mechanicaButton';

interface Message {
  id: string;
  type: 'user' | 'coach';
  content: string;
  timestamp: Date;
}

interface CoachingInsight {
  category: string;
  title: string;
  description: string;
  icon: string;
}

const coachingInsights: CoachingInsight[] = [
  {
    category: 'Behavioral Finance',
    title: 'Loss Aversion Bias',
    description: 'Investors tend to feel the pain of losses more intensely than the pleasure of gains. This can lead to holding losing investments too long or selling winners too early.',
    icon: '📉'
  },
  {
    category: 'Risk Management',
    title: 'Diversification Principle',
    description: 'Spreading investments across different asset classes reduces portfolio volatility. Don\'t put all your eggs in one basket, even if it looks like the best basket.',
    icon: '🥚'
  },
  {
    category: 'Market Psychology',
    title: 'Herding Behavior',
    description: 'Following the crowd can be dangerous during market extremes. The best opportunities often exist when others are fearful or greedy.',
    icon: '🐑'
  },
  {
    category: 'Long-term Thinking',
    title: 'Compound Interest Effect',
    description: 'Time in the market beats timing the market. Consistent long-term investing harnesses the power of compound growth.',
    icon: '📈'
  },
  {
    category: 'Emotional Control',
    title: 'Fear and Greed Cycle',
    description: 'Market emotions drive cycles of fear and greed. Successful investors maintain discipline regardless of market sentiment.',
    icon: '😰'
  },
  {
    category: 'Investment Strategy',
    title: 'Dollar-Cost Averaging',
    description: 'Investing fixed amounts regularly reduces the impact of market volatility and removes emotional timing decisions.',
    icon: '💰'
  }
];

// Dynamic insights generator based on user behavior and time
const generateDynamicInsight = (userMessageCount: number, sessionDuration: number): CoachingInsight => {
  const hour = new Date().getHours();
  const insights = [...coachingInsights];

  // Rotate insights based on time, interaction, and session duration
  const timeBasedIndex = hour % insights.length;
  const interactionBasedIndex = userMessageCount % insights.length;
  const durationBasedIndex = Math.floor(sessionDuration / 60) % insights.length; // Change every minute

  // Combine factors for more personalized selection
  const selectedIndex = (timeBasedIndex + interactionBasedIndex + durationBasedIndex) % insights.length;

  return insights[selectedIndex];
};

const coachResponses = [
  "That's a great question! Let me help you understand this concept better.",
  "I understand your concern. Many investors face similar challenges.",
  "Based on behavioral finance principles, here's what I recommend...",
  "Research shows that successful investors often approach this differently.",
  "Let me share an insight that might help with your investment journey.",
  "This is a common psychological trap in investing. Here's how to avoid it...",
  "Consider this perspective from behavioral economics...",
  "The data suggests that rational investors would typically...",
  "That's an interesting observation! Here's what the research says...",
  "Let me break this down into actionable steps for you."
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'coach',
      content: "Hello! I'm your AI Behavioral Coach. I'm here to help you understand the psychological aspects of investing and make better decisions. What investing topic would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<CoachingInsight | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track user interaction for dynamic insights
  const [sessionStart] = useState(Date.now());
  const [messageCount, setMessageCount] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update dynamic insight based on user behavior
  useEffect(() => {
    const sessionDuration = (Date.now() - sessionStart) / 1000; // in seconds
    const dynamicInsight = generateDynamicInsight(messageCount, sessionDuration);
    setCurrentInsight(dynamicInsight);
  }, [messageCount, sessionStart]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateCoachResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('loss') || lowerMessage.includes('losing money')) {
      return "Loss aversion is a powerful bias! Research shows investors feel losses about 2.5x more intensely than equivalent gains. This can lead to holding losers too long. Consider setting predefined exit points based on your original investment thesis, not emotional reactions.";
    }

    if (lowerMessage.includes('fear') || lowerMessage.includes('scared')) {
      return "Fear is a natural emotion in investing, but it often leads to poor timing decisions. The best investors use fear as an opportunity indicator - when others are fearful, it may be time to consider buying quality assets at discount prices.";
    }

    if (lowerMessage.includes('diversif') || lowerMessage.includes('spread')) {
      return "Diversification is your best defense against uncertainty! Consider spreading across: 1) Different asset classes (stocks, bonds, real estate), 2) Geographic regions, 3) Industry sectors. This smooths returns while maintaining growth potential.";
    }

    if (lowerMessage.includes('beginner') || lowerMessage.includes('starting')) {
      return "Welcome to investing! As a beginner, focus on: 1) Low-cost index funds for instant diversification, 2) Consistent contributions over time, 3) Avoiding market timing, and 4) Understanding your risk tolerance. Start simple and build complexity gradually.";
    }

    // Default response
    return coachResponses[Math.floor(Math.random() * coachResponses.length)];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageCount(prev => prev + 1); // Track message count for dynamic insights
    setInputMessage('');
    setIsTyping(true);

    // Simulate coach response delay
    setTimeout(() => {
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'coach',
        content: generateCoachResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, coachMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showRandomInsight = () => {
    const randomInsight = coachingInsights[Math.floor(Math.random() * coachingInsights.length)];
    setCurrentInsight(randomInsight);
  };

  return (
    <MechanicaLayout
      title="AI Behavioral Coach"
      description="Get personalized investing insights and behavioral coaching from our AI-powered investment coach."
    >
      <Head>
        <title>AI Behavioral Coach | BeginnerInvestorHub</title>
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
        {/* Steam Vents for Hero */}
        <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-white/20 to-transparent mechanica-steam"></div>
        <div className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-white/20 to-transparent mechanica-steam" style={{ animationDelay: '1.5s' }}></div>

        {/* Mechanical background grid */}
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

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex justify-center items-center space-x-6 mb-8">
            <MechanicaGear size="xl" color="brass" speed="slow" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mechanica-title-gold-chrome mechanica-float">
              The <span className="text-yellow-400">Behavioral</span> Coach
            </h1>
            <MechanicaGear size="xl" color="brass" speed="reverse" />
          </div>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Your guide to the human side of wealth. Learn to spot emotional traps and build a disciplined investment machine.
          </p>

          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border border-yellow-500/30 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100/90">
                PROTOCOL: BHV-COACH v1.0 [PSYCHOLOGY ALIGNMENT]
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
      </section>

      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <MechanicaCard variant="mechanical" animated className="h-[600px] flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${message.type === 'user'
                            ? 'bg-mechanica-moonlight-blue text-white'
                            : 'bg-gray-100 text-gray-900 shadow-sm'
                            }`}
                        >
                          <div className="text-sm mb-2 opacity-75">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="leading-relaxed">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 p-4 rounded-2xl">
                          <div className="flex items-center space-x-2">
                            <MechanicaGear size="small" color="steel" speed="fast" />
                            <span className="text-sm">Coach is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about investing psychology, behavioral biases, or decision-making..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:border-transparent"
                    />
                    <MechanicaButton
                      variant="brass"
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="px-6"
                    >
                      Send
                    </MechanicaButton>
                  </div>
                </div>
              </MechanicaCard>
            </div>

            {/* Insights Panel */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <MechanicaCard variant="wood" animated>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <MechanicaButton
                      variant="mechanical"
                      onClick={showRandomInsight}
                      className="w-full"
                    >
                      💡 Get Random Insight
                    </MechanicaButton>
                    <MechanicaButton
                      variant="brass"
                      onClick={() => {
                        const welcomeMessage: Message = {
                          id: Date.now().toString(),
                          type: 'coach',
                          content: "I'm here to help! You can ask me about: • Behavioral biases • Risk management • Market psychology • Investment strategies • Emotional control. What would you like to explore?",
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, welcomeMessage]);
                      }}
                      className="w-full"
                    >
                      📋 See Help Topics
                    </MechanicaButton>
                  </div>
                </div>
              </MechanicaCard>

              {/* Current Insight */}
              {currentInsight && (
                <MechanicaCard variant="brass" animated>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{currentInsight.icon}</span>
                      <h4 className="text-lg font-bold text-gray-900">
                        {currentInsight.title}
                      </h4>
                    </div>
                    <div className="text-sm text-mechanica-moonlight-blue font-bold uppercase tracking-wider mb-3">
                      {currentInsight.category}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentInsight.description}
                    </p>
                  </div>
                </MechanicaCard>
              )}

              {/* Coaching Stats */}
              <MechanicaCard variant="mechanical" animated>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Session Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Messages</span>
                      <span className="font-mono font-bold">{messages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topics Covered</span>
                      <span className="font-mono font-bold">{coachingInsights.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coach Status</span>
                      <span className="text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>
          {/* Educational "Why This Matters" Module */}
          <div className="mt-20 w-full">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-mechanica-moonlight-blue font-serif mb-4 uppercase tracking-tighter">
                💡 Why Behavioral Coaching Matters
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto font-medium">
                Investing is 20% head knowledge and 80% behavior. Your biggest risk isn't the market—it's your own reactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MechanicaCard variant="wood" className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🧘</div>
                  <h4 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">Beat Emotional Traps</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-black">
                    Our brains are wired for survival, not for the stock market. Coaching helps you spot when fear or greed is making your decisions for you.
                  </p>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="mechanical" className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h4 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">Build Better Habits</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-black">
                    Consistency is the secret weapon of the wealthy. We help you build the discipline to stick to your plan even when things get noisy.
                  </p>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="brass" className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">🔭</div>
                  <h4 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">Long-Term Vision</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-black">
                    It's easy to get lost in the day-to-day "noise" of the market. Coaching keeps your focus on the big picture and your ultimate goals.
                  </p>
                </div>
              </MechanicaCard>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
