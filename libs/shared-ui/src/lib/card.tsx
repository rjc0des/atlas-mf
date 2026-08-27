import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './cn';

const cardVariants = cva('bg-surface border border-border rounded-sm', {
  variants: {
    accent: {
      none: '',
      danger: 'border-l-4 border-l-danger',
      warning: 'border-l-4 border-l-warning',
      success: 'border-l-4 border-l-success',
      info: 'border-l-4 border-l-info',
    },
  },
  defaultVariants: {
    accent: 'none',
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, accent, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ accent, className }))} {...props} />
  )
);
Card.displayName = 'Card';
