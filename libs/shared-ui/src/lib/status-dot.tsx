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
    VariantProps<typeof dotVariants> {
  /** Adds a ping ring, for the one or two dots on screen that mean "live". */
  live?: boolean;
}

export function StatusDot({ className, tone, live, ...props }: StatusDotProps) {
  if (!live) {
    return <span className={cn(dotVariants({ tone, className }))} {...props} />;
  }
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" {...props}>
      <span className={cn(dotVariants({ tone }), 'absolute inline-flex h-full w-full animate-ping opacity-75')} />
      <span className={cn(dotVariants({ tone, className }), 'relative')} />
    </span>
  );
}
