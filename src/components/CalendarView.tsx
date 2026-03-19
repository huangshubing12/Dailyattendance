import { useStore } from '@/store';
import { CATEGORY_COLORS, TaskCategory } from '@/store/types';

export function CalendarView() {
  const progress = useStore(state => state.progress);

  if (!progress) return null;

  const totalDays = 30;
  const completedDays = new Set(progress.completedDays);
  const currentDay = progress.currentDay;
  const dailyTasks = progress.dailyTasks;

  const getDayStatus = (day: number): 'completed' | 'current' | 'future' => {
    if (completedDays.has(day)) return 'completed';
    if (day === currentDay) return 'current';
    return 'future';
  };

  const getTaskCategory = (day: number): string | undefined => {
    const task = dailyTasks.find(t => t.dayIndex === day);
    return task?.taskCategory;
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">📆 打卡日历</h3>
        <p className="text-sm text-muted-foreground mt-1">
          已完成 {completedDays.size} / 30 天
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* 星期标题 */}
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}

        {/* 日期格子 */}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const status = getDayStatus(day);
          const category = getTaskCategory(day);
          const color = category ? CATEGORY_COLORS[category as TaskCategory] : undefined;

          const getBgColor = () => {
            if (status === 'completed') return 'bg-success/20';
            if (status === 'current') return 'bg-primary/20 ring ring-primary';
            return 'bg-muted/30';
          };

          return (
            <div
              key={day}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center text-sm
                ${getBgColor()} transition-all duration-200
              `}
              style={color && status === 'completed' ? { backgroundColor: color + '30' } : undefined}
              title={dailyTasks.find(t => t.dayIndex === day)?.taskContent || ''}
            >
              <span
                className={`
                  font-medium
                  ${status === 'completed' ? 'text-success' : ''}
                  ${status === 'current' ? 'text-primary' : ''}
                  ${status === 'future' ? 'text-muted-foreground' : ''}
                `}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success/20" />
          <span>已完成</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary/20 ring ring-primary" />
          <span>今日</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted/30" />
          <span>待完成</span>
        </div>
      </div>
    </div>
  );
}
