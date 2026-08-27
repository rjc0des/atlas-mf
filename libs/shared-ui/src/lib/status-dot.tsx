import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

const dotVariants = cva('inline-block h-2 w-2 rounded-full shrink-0', {
  variants: {
    tone: {
      danger: 'bg-danger',
      warning: 'bg-warning',
      success: 'bg-success',
      info: 'bg-info',
      neutral: 'bg-text-muted',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {}

export function StatusDot({ className, tone, ...props }: StatusDotProps) {
  return <span className={cn(dotVariants({ tone, className }))} {...props} />;
}
