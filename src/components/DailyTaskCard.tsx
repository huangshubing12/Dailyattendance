import React, { useState, useEffect } from 'react';
import { useStore } from '@/store';
import type { DailyTaskRecord } from '@/store/types';
import { CATEGORY_NAMES, MAX_SWITCHES_PER_DAY } from '@/store/types';
import { TASKS } from '@/lib/tasks';
import { getRandomQuote } from '@/lib/quotes';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Shuffle, Check, Sparkles } from 'lucide-react';

export function DailyTaskCard() {
  const { progress } = useStore();
  const getDailyTask = useStore(state => state.getDailyTask);
  const switchDailyTask = useStore(state => state.switchDailyTask);
  const completeTask = useStore(state => state.completeTask);

  const [task, setTask] = useState<DailyTaskRecord | null>(null);
  const [error, setError] = useState<string>('');

  // 获取当日任务
  React.useEffect(() => {
    try {
      const dailyTask = getDailyTask(TASKS);
      setTask(dailyTask);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取任务失败');
    }
  }, [progress?.currentDay, getDailyTask]);

  if (!progress) return null;

  const today = new Date().toDateString();
  const switchesLeft = MAX_SWITCHES_PER_DAY - (task?.switchCount || 0);
  const lastSwitchDate = task?.lastSwitchDate;
  const isSwitchUsedToday = lastSwitchDate === today;

  const handleSwitch = () => {
    if (!task) return;

    if (isSwitchUsedToday && switchesLeft <= 0) {
      setError('今日切换次数已用完');
      return;
    }

    try {
      // 获取未使用的任务
      const usedTaskIds = [...task.switchHistory];
      const availableTasks = TASKS.filter(t => !usedTaskIds.includes(t.id));

      if (availableTasks.length === 0) {
        setError('没有更多可选的小事了');
        return;
      }

      const newTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
      switchDailyTask(newTask);
      setTask(prev => prev ? {
        ...prev,
        taskId: newTask.id,
        taskContent: newTask.content,
        taskCategory: newTask.category,
        switchCount: prev.switchCount + 1,
        switchHistory: [...prev.switchHistory, newTask.id],
        lastSwitchDate: today,
      } : null);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '切换失败');
    }
  };

  const handleComplete = () => {
    if (!task || task.isCompleted) return;

    const quote = getRandomQuote();
    completeTask(quote);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
        {error}
      </div>
    );
  }

  if (!task) {
    return (
      <div className="bg-muted rounded-xl p-8 text-center">
        <Sparkles className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">正在生成今日小事...</p>
      </div>
    );
  }

  const canSwitch = !task.isCompleted && switchesLeft > 0;

  return (
    <div className="space-y-4">
      {/* 日期显示 */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">
          {progress.startDate ? new Date(progress.startDate).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) : ''}
        </div>
        <div className="text-2xl font-semibold text-primary-foreground">
          第 {task.dayIndex} 天
        </div>
      </div>

      {/* 任务卡片 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* 类别标签 */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={task.taskCategory}>
            {CATEGORY_NAMES[task.taskCategory]}
          </Badge>
          {!task.isCompleted && (
            <div className="text-sm text-muted-foreground">
              还可切换 {switchesLeft} 次
            </div>
          )}
        </div>

        {/* 任务内容 */}
        <div className="space-y-4">
          <div className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
            {task.taskContent}
          </div>

          {/* 已完成状态 */}
          {task.isCompleted && (
            <div className="flex items-center gap-2 text-success">
              <Check className="w-5 h-5" />
              <span className="font-medium">已完成</span>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        {!task.isCompleted && (
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSwitch}
              disabled={!canSwitch}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              换一件
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleComplete}
            >
              <Check className="w-4 h-4 mr-2" />
              打卡
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
