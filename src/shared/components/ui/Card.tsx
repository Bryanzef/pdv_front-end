import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type CardVariant = 'default' | 'outlined' | 'ghost';
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
  default: 'bg-background-component rounded-lg shadow-md',
  outlined: 'bg-background-component rounded-lg border border-border',
  ghost: 'bg-transparent p-0',
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
      variant !== 'ghost' && paddingClasses[padding],
      hover && 'transition-all duration-normal hover:shadow-lg hover:-translate-y-1',
      clickable && 'cursor-pointer',
      className
    )
  );

  return <div className={classes} {...props} />;
};

export default Card;


