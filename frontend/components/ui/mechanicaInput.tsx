import React from 'react';

interface MechanicaInputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel';
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    error?: string;
    success?: string;
    disabled?: boolean;
    loading?: boolean;
    required?: boolean;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    name?: string;
    min?: string | number;
    step?: string | number;
}

export const MechanicaInput: React.FC<MechanicaInputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    label,
    error,
    success,
    disabled = false,
    loading = false,
    required = false,
    className = '',
    style = {},
    id,
    name,
    min,
    step
}) => {
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses = 'mechanica-input-mechanical';
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '';
    const successClasses = success ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : '';
    const loadingClasses = loading ? 'opacity-75' : '';

    const combinedClasses = [
        baseClasses,
        errorClasses,
        successClasses,
        loadingClasses,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide mechanica-text-technical"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    type={type}
                    id={inputId}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled || loading}
                    required={required}
                    className={combinedClasses}
                    style={style}
                    min={min}
                    step={step}
                />

                {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="mechanica-spinner w-4 h-4 border-2 border-mechanica-moonlight-blue border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {error && (
                <div className="text-red-500 text-sm mt-1 mechanica-text-technical">
                    {error}
                </div>
            )}

            {success && (
                <div className="text-green-500 text-sm mt-1 mechanica-text-technical">
                    {success}
                </div>
            )}
        </div>
    );
};

export default MechanicaInput;
