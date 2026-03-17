'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store';
import { HistoryList } from '@/components/HistoryList';
import { CalendarView } from '@/components/CalendarView';
import { Button } from './components/ui/Button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { progress, initProgress, resetProgress } = useStore();

  // 初始化进度
  useEffect(() => {
    initProgress();
  }, [initProgress]);

  const completedCount = progress?.completedDays.length || 0;

  return (
    <div className="min-h-screen pb-8">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">
            历史记录
          </h1>
          <div className="w-8" /> {/* 占位保持居中 */}
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="space-y-6">
          {/* 统计信息 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground mb-2">
                {completedCount}
              </div>
              <div className="text-muted-foreground">
                已完成 / 30 天
              </div>
            </div>
          </div>

          {/* 日历视图 */}
          <CalendarView />

          {/* 历史列表 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              打卡详情
            </h2>
            <HistoryList />
          </div>

          {/* 重新开始按钮 */}
          {completedCount > 0 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm('确定要清空所有记录并重新开始吗？')) {
                    resetProgress();
                    window.location.href = '/';
                  }
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重新开始挑战
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
