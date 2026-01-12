import React, { useEffect } from 'react';
import axios from 'axios';

interface InteractionTrackerProps {
  userId: string;
  sessionId: string;
}

interface CustomEventDetail {
  contentId?: string;
  timeSpent?: number;
  nudgeId?: string;
}

interface CustomEvent extends Event {
  detail: CustomEventDetail;
}

const InteractionTracker: React.FC<InteractionTrackerProps> = ({ userId, sessionId }) => {
  useEffect(() => {
    const logInteraction = async (eventType: string, eventDetails: Record<string, unknown>) => {
      try {
        await axios.post('/api/v1/learning/feedback/log', {
          user_id: userId,
          session_id: sessionId,
          event_type: eventType,
          event_details: eventDetails,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error logging interaction:', error);
      }
    };

    const handleContentView = (event: Event) => {
      const customEvent = event as CustomEvent;
      logInteraction('content_view', { contentId: customEvent.detail.contentId, timeSpent: customEvent.detail.timeSpent });
    };

    const handleNudgeClick = (event: Event) => {
      const customEvent = event as CustomEvent;
      logInteraction('nudge_click', { nudgeId: customEvent.detail.nudgeId });
    };

    // Add event listeners for custom events dispatched from other components
    document.addEventListener('contentView', handleContentView);
    document.addEventListener('nudgeClick', handleNudgeClick);

    return () => {
      // Clean up event listeners
      document.removeEventListener('contentView', handleContentView);
      document.removeEventListener('nudgeClick', handleNudgeClick);
    };
  }, [userId, sessionId]);

  return null; // This component does not render anything
};

export default InteractionTracker;
