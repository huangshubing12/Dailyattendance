import { useStore } from '@/store';
import { Progress } from './ui/Progress';
import { Calendar, Flame } from 'lucide-react';

export function ProgressDisplay() {
  const progress = useStore(state => state.progress);
  const getProgressPercent = useStore(state => state.getProgressPercent);
  const getStreakDays = useStore(state => state.getStreakDays);

  if (!progress) return null;

  const percent = getProgressPercent();
  const streak = getStreakDays();
  const completedCount = progress.completedDays.length;

  return (
    <div className="space-y-4">
      {/* 顶部统计 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-foreground" />
          <span className="text-lg font-semibold text-primary-foreground">
            Day {progress.currentDay}
          </span>
          <span className="text-sm text-muted-foreground">/ 30</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-medium text-muted-foreground">
            连续 {streak} 天
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <Progress
        value={completedCount}
        max={30}
        size="lg"
        showLabel={true}
        label="已完成"
      />
    </div>
  );
}
