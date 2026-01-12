import React, { useEffect, useState } from 'react';

interface MechanicaGearProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'large' | 'medium' | 'small';
  color?: 'brass' | 'steel' | 'copper' | 'blue' | 'gray';
  speed?: 'slow' | 'normal' | 'fast' | 'reverse' | 'medium';
  className?: string;
}

export const MechanicaGear: React.FC<MechanicaGearProps> = ({ 
  size = 'md', 
  color = 'steel', 
  speed = 'normal', 
  className = '' 
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const speedMap = {
      slow: 0.5,
      normal: 1,
      fast: 2,
      reverse: -1,
      medium: 1.5
    };

    const interval = setInterval(() => {
      setRotation(prev => (prev + speedMap[speed]) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    large: 'w-16 h-16',
    medium: 'w-12 h-12',
    small: 'w-6 h-6'
  };

  const colorMap = {
    brass: 'text-yellow-600',
    steel: 'text-gray-500',
    copper: 'text-orange-600',
    blue: 'text-blue-500',
    gray: 'text-gray-400'
  };

  return (
    <div 
      className={`${sizeMap[size]} ${colorMap[color]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.64-.07.97c0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.63Z"/>
      </svg>
    </div>
  );
};
