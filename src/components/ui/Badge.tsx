import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'emotion' | 'body' | 'social' | 'growth' | 'rest';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/20 text-primary-foreground',
    success: 'bg-success/20 text-success-foreground',
    emotion: 'bg-pink-100 text-pink-700',
    body: 'bg-teal-100 text-teal-700',
    social: 'bg-yellow-100 text-yellow-700',
    growth: 'bg-blue-100 text-blue-700',
    rest: 'bg-orange-100 text-orange-700',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
