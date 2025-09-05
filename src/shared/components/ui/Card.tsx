import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  clickable?: boolean;
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-gray-200 rounded-lg',
  elevated: 'bg-white shadow-md rounded-lg',
  outlined: 'bg-white border-2 border-gray-200 rounded-lg',
  ghost: 'bg-transparent',
};

const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  ...props
}) => {
  const classes = twMerge(
    clsx(
      variantClasses[variant],
      paddingClasses[padding],
      hover && 'transition duration-fast ease-standard hover:shadow-lg hover:-translate-y-0.5',
      clickable && 'cursor-pointer',
      className
    )
  );

  return <div className={classes} {...props} />;
};

export default Card;


