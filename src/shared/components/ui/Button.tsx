import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const baseClasses = 'inline-flex items-center justify-center rounded-md text-button transition-all duration-normal focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed';

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs py-1 px-2',
  sm: 'text-sm py-2 px-3',
  md: 'py-3 px-6',
  lg: 'py-3 px-6 text-lg',
  xl: 'py-4 px-8 text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover hover:shadow-sm',
  secondary: 'bg-background-component text-secondary border border-border hover:bg-primary-soft hover:border-primary',
  ghost: 'bg-transparent text-secondary hover:bg-background-app',
  danger: 'bg-danger text-white hover:opacity-90 hover:shadow-sm',
};

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const classes = twMerge(
    clsx(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      fullWidth && 'w-full',
      className
    )
  );

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;


