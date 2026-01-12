import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Mock AI response for demo mode
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponses = [
        "That's a great question about investing! Remember to always diversify your portfolio.",
        "I recommend researching companies thoroughly before making any investment decisions.",
        "Consider your risk tolerance and financial goals when choosing investments.",
        "It's wise to start with index funds if you're new to investing.",
        "Always consult with a qualified financial advisor for personalized advice."
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: randomResponse,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat widget:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about investing..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
