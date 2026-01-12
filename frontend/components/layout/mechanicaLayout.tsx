import React from 'react';
import NudgeChatWidget from '../NudgeChatWidget';
import { MechanicaFooter } from './mechanicaFooter';

interface MechanicaLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const MechanicaLayout: React.FC<MechanicaLayoutProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <MechanicaFooter />
      <NudgeChatWidget />
    </div>
  );
};
