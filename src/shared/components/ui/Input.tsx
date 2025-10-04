import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type InputVariant = 'default' | 'floating' | 'integrated';
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  md: 'h-11 text-base',
  lg: 'h-12 text-base',
};

const baseInput = 'block w-full rounded-md border border-border bg-background-component placeholder-text-disabled text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft disabled:opacity-60';

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
  const inputClasses = twMerge(clsx(
    baseInput, 
    sizeClasses[size], 
    error && 'border-danger focus:border-danger focus:ring-danger/20',
    className
  ));

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block mb-2 text-label font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex items-stretch">
        {leftAddon && (
          <span className="inline-flex items-center px-3 text-text-secondary bg-background-app border border-r-0 border-border rounded-l-md">
            {leftAddon}
          </span>
        )}
        <input id={inputId} className={inputClasses} {...props} />
        {rightAddon && (
          <span className="inline-flex items-center px-3 text-text-secondary bg-background-app border border-l-0 border-border rounded-r-md">
            {rightAddon}
          </span>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-caption text-text-secondary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-caption text-danger">{error}</p>
      )}
    </div>
  );
};

export default Input;


