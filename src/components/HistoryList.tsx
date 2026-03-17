import { useStore } from '@/store';
import { CATEGORY_NAMES, CATEGORY_COLORS } from '@/store/types';
import { Check, Calendar as CalendarIcon } from 'lucide-react';

interface HistoryListProps {
  limit?: number; // 限制显示数量，undefined 表示显示全部
}

export function HistoryList({ limit }: HistoryListProps) {
  const progress = useStore(state => state.progress);

  if (!progress) return null;

  const tasks = [...progress.dailyTasks].sort((a, b) => b.dayIndex - a.dayIndex);
  const displayTasks = limit ? tasks.slice(0, limit) : tasks;

  return (
    <div className="space-y-3">
      {displayTasks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>还没有打卡记录</p>
        </div>
      ) : (
        displayTasks.map((task) => (
          <div
            key={task.dayIndex}
            className={`p-4 rounded-xl border ${
              task.isCompleted
                ? 'bg-success/5 border-success/20'
                : 'bg-muted border-transparent'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* 状态图标 */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                task.isCompleted ? 'bg-success' : 'bg-muted'
              }`}>
                {task.isCompleted && <Check className="w-4 h-4 text-white" />}
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Day {task.dayIndex}
                  </span>
                  {/* 类别标签 */}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: CATEGORY_COLORS[task.taskCategory] + '30',
                      color: CATEGORY_COLORS[task.taskCategory],
                    }}
                  >
                    {CATEGORY_NAMES[task.taskCategory]}
                  </span>
                  {task.isCompleted && task.completedAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(task.completedAt).toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                <p className="text-foreground">
                  {task.taskContent}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {limit && tasks.length > limit && (
        <div className="text-center pt-4">
          <button className="text-primary-foreground hover:underline text-sm">
            查看全部 {tasks.length} 条记录
          </button>
        </div>
      )}
    </div>
  );
}
