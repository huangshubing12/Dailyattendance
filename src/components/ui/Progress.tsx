import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  label,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">{label || '进度'}</span>
          <span className="text-sm font-medium text-primary-foreground">
            {value}/{max}
          </span>
        </div>
      )}
      <div
        className={cn(
          'bg-muted rounded-full overflow-hidden',
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            'h-full bg-primary rounded-full transition-all duration-500 ease-out',
            'bg-gradient-to-r from-orange-200 to-orange-300'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
