import React from 'react';
import { MechanicaCard } from '../ui/mechanicaCard';
import { MechanicaGear } from '../ui/mechanicaGear';
import { MechanicaButton } from '../ui/mechanicaButton';

// Define expected structure for the assessment result (matching VarkAssessment.tsx)
interface VarkAssessmentResult {
  primary_vark_preference: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  vark_profile_data: {
    visual: number;
    aural: number;
    read_write: number;
    kinesthetic: number;
  };
  assessment_version: string;
  total_duration: number; // Duration in seconds
  confidence_metrics: Record<string, number>;
}

interface VarkResultDisplayProps {
  result: VarkAssessmentResult;
  onContinue: () => void;
}

const getStyleDetails = (style: string) => {
  switch (style) {
    case 'visual':
      return {
        label: 'Visual (V)',
        description: 'You prefer to learn using images, maps, graphs, and other visual aids.',
        icon: '👀',
        color: 'text-blue-500',
      };
    case 'aural':
      return {
        label: 'Aural (A)',
        description: 'You learn best through listening, discussions, lectures, and audio recordings.',
        icon: '👂',
        color: 'text-green-500',
      };
    case 'read_write':
      return {
        label: 'Read/Write (R)',
        description: 'You excel through reading and writing, such as notes, texts, and lists.',
        icon: '✍️',
        color: 'text-purple-500',
      };
    case 'kinesthetic':
      return {
        label: 'Kinesthetic (K)',
        description: 'You learn by doing, experiencing, and practicing.',
        icon: '🤸',
        color: 'text-yellow-600',
      };
    default:
      return {
        label: 'Unknown',
        description: 'Your learning preference could not be determined.',
        icon: '❓',
        color: 'text-gray-500',
      };
  }
};

const VarkResultDisplay: React.FC<VarkResultDisplayProps> = ({ result, onContinue }) => {
  const { primary_vark_preference, vark_profile_data, total_duration } = result;
  const primaryStyle = getStyleDetails(primary_vark_preference);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} sec`;
    }
    return `${remainingSeconds} sec`;
  };

  return (
    <MechanicaCard variant="mechanical" className="p-8 text-center">
      <MechanicaGear size="xl" color="brass" speed="slow" className="mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4 mechanica-heading-professional text-mechanica-moonlight-blue">
        Your Learning Style Profile
      </h2>
      <p className="text-lg text-gray-700 mb-8 mechanica-text-technical">
        Based on your responses, your primary learning preference is:
      </p>

      <div className="mb-8">
        <MechanicaCard variant="wood" className="inline-block p-6">
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-5xl ${primaryStyle.color}`}>{primaryStyle.icon}</span>
            <div>
              <h3 className="text-4xl font-bold mechanica-heading-mechanical text-mechanica-text-wood">
                {primaryStyle.label}
              </h3>
              <p className="text-gray-600 mechanica-text-technical">{primaryStyle.description}</p>
            </div>
          </div>
        </MechanicaCard>
      </div>

      <div className="mb-8 text-left">
        <h4 className="text-xl font-bold mb-4 mechanica-heading-professional text-mechanica-moonlight-blue">
          Your VARK Scores:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(vark_profile_data).map(([style, score]) => {
            const details = getStyleDetails(style);
            return (
              <MechanicaCard key={style} variant="mechanical" className="p-4 flex items-center space-x-4">
                <span className={`text-3xl ${details.color}`}>{details.icon}</span>
                <div>
                  <p className="font-semibold mechanica-text-technical">{details.label}</p>
                  <p className="text-2xl font-bold mechanica-heading-mechanical">{score}</p>
                </div>
              </MechanicaCard>
            );
          })}
        </div>
      </div>

      {total_duration !== undefined && (
        <p className="text-sm text-gray-500 mb-8 mechanica-text-technical">
          Assessment completed in: {formatDuration(total_duration)}
        </p>
      )}

      <h4 className="text-xl font-bold mb-4 mechanica-heading-professional text-mechanica-moonlight-blue">
        Recommendations based on {primaryStyle.label}:
      </h4>
      <div className="text-left mb-8 mechanica-text-technical">
        <ul className="list-disc list-inside space-y-2">
          {primary_vark_preference === 'visual' && (
            <>
              <li>Utilize charts, graphs, and infographics for data analysis.</li>
              <li>Watch educational videos and webinars.</li>
              <li>Create mind maps or draw diagrams to summarize concepts.</li>
            </>
          )}
          {primary_vark_preference === 'aural' && (
            <>
              <li>Listen to financial podcasts and audiobooks.</li>
              <li>Participate in discussions and Q&A sessions.</li>
              <li>Explain concepts aloud to yourself or others.</li>
            </>
          )}
          {primary_vark_preference === 'read_write' && (
            <>
              <li>Read detailed reports, articles, and financial news.</li>
              <li>Take extensive notes and re-write information in your own words.</li>
              <li>Create summaries and lists of key investment terms.</li>
            </>
          )}
          {primary_vark_preference === 'kinesthetic' && (
            <>
              <li>Engage in simulated trading platforms and practice portfolios.</li>
              <li>Use interactive tools and financial calculators.</li>
              <li>Apply theories through case studies and real-world examples.</li>
            </>
          )}
        </ul>
      </div>

      <MechanicaButton variant="mechanical" onClick={onContinue} className="w-full md:w-auto">
        Continue to Dashboard
      </MechanicaButton>
    </MechanicaCard>
  );
};

export default VarkResultDisplay;
