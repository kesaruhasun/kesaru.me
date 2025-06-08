import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        
        // Variant styles
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'outline' && 'border border-input hover:bg-accent hover:text-accent-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
        variant === 'link' && 'text-primary underline-offset-4 hover:underline',
        variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        
        // Size styles
        size === 'default' && 'h-10 px-4 py-2',
        size === 'sm' && 'h-9 rounded-md px-3',
        size === 'lg' && 'h-11 rounded-md px-8',
        size === 'icon' && 'h-10 w-10',
        
        // Additional classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
