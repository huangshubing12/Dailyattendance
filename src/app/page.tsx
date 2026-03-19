'use client'

import React, { useEffect } from 'react';
import type { DailyTaskRecord } from '@/store/types';
import { useStore } from '@/store';
import { ProgressDisplay } from '@/components/ProgressDisplay';
import { DailyTaskCard } from '@/components/DailyTaskCard';
import { BookmarkModal } from '@/components/BookmarkModal';
import { HistoryList } from '@/components/HistoryList';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { progress, initProgress, resetProgress, checkNewDay } = useStore();

  // 初始化进度
  useEffect(() => {
    initProgress();
    checkNewDay();
  }, [initProgress, checkNewDay]);

  // 检查是否完成30天
  const isAllCompleted = progress && progress.completedDays.length >= 30;

  return (
    <div className="min-h-screen pb-8">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            30 天自愈式打卡挑战工具
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="ghost" size="sm">
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="space-y-6">
          {/* 进度显示 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <ProgressDisplay />
          </div>

          {/* 完成状态 */}
          {isAllCompleted ? (
            <div className="bg-gradient-to-br from-success/20 to-primary/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                恭喜你完成了30天挑战！
              </h2>
              <p className="text-muted-foreground mb-6">
                你已经成功完成了所有打卡，真了不起！
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm('确定要重新开始吗？')) {
                    resetProgress();
                  }
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重新开始
              </Button>
            </div>
          ) : (
            /* 每日任务卡片 */
            <DailyTaskCard />
          )}

          {/* 最近打卡记录 */}
          {progress && progress.completedDays.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                📝 最近打卡
              </h2>
              <HistoryList limit={3} />
            </div>
          )}
        </div>
      </main>

      {/* 治愈书签弹窗 */}
      <BookmarkModal />
    </div>
  );
}
