import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from './cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-8 rounded-sm border border-border bg-surface-2 px-2 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
