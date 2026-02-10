import React from 'react';
import Link from 'next/link';
import { MechanicaGear } from '../ui/mechanicaGear';

interface MechanicaHeaderProps {
    showBackButton?: boolean;
    title?: string;
    subtitle?: string;
    className?: string;
}

export const MechanicaHeader: React.FC<MechanicaHeaderProps> = ({
    showBackButton = false,
    title,
    subtitle,
    className = ''
}) => {
    return (
        <header className={`mechanica-header overflow-hidden py-8 md:py-12 ${className}`}>
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center">
                    {/* Back button */}
                    {showBackButton && (
                        <div className="mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-blue-100 hover:text-white transition-colors duration-300 mechanica-text-technical"
                            >
                                <span className="mr-2">←</span>
                                Back to Home
                            </Link>
                        </div>
                    )}

                    {/* Header content */}
                    {title && (
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mechanica-heading-professional text-white leading-tight">
                            <span className="relative inline-block">
                                {title}
                                <span className="hidden md:block absolute bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-mechanica-polished-brass via-yellow-200 to-mechanica-polished-brass rounded-full" />
                            </span>
                        </h1>
                    )}

                    {subtitle && (
                        <p className="text-lg md:text-xl text-blue-100 font-light max-w-3xl mx-auto mechanica-text-technical">
                            {subtitle}
                        </p>
                    )}

                    {/* Professional decorative elements */}
                    <div className="flex justify-center items-center space-x-8 mt-6 md:mt-8 scale-90 md:scale-100">
                        <MechanicaGear size="lg" color="brass" speed="slow" />
                        <MechanicaGear size="medium" color="steel" speed="reverse" />
                        <MechanicaGear size="small" color="copper" speed="medium" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MechanicaHeader;