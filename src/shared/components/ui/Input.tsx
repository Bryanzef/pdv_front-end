import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type InputVariant = 'default' | 'floating' | 'integrated';
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  variant?: InputVariant;
  size?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-12 text-base',
};

const baseInput = 'block w-full rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-60';

const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  helperText,
  leftAddon,
  rightAddon,
  variant = 'default',
  size = 'md',
  id,
  ...props
}) => {
  const inputId = id || React.useId();
  const inputClasses = twMerge(clsx(baseInput, sizeClasses[size], className));

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-neutral-900">
          {label}
        </label>
      )}
      <div className="relative flex items-stretch">
        {leftAddon && (
          <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
            {leftAddon}
          </span>
        )}
        <input id={inputId} className={inputClasses} {...props} />
        {rightAddon && (
          <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
            {rightAddon}
          </span>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;


