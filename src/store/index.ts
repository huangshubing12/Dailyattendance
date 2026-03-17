// 总天数常量
const TOTAL_DAYS = 30;

import { create } from 'zustand';
import type {
  AppState,
  UserProgress,
  DailyTaskRecord,
  SmallTask,
  HealingQuote,
  MAX_SWITCHES_PER_DAY,
} from './types';
import { parseISO, differenceInDays, startOfDay } from 'date-fns';

// ============ 本地存储工具函数 ============

function safeLocalStorageGet<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function safeLocalStorageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

function safeLocalStorageRemove(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

// ============ Store 创建 ============

export const useStore = create<AppState>((set, get) => ({
  // 初始状态
  progress: null,
  currentQuote: null,
  showBookmark: false,
  isLoading: false,

  // 初始化进度
  initProgress: () => {
    set({ isLoading: true });

    const savedProgress = safeLocalStorageGet<UserProgress | null>(
      '30day_user_progress',
      null
    );

    if (savedProgress) {
      // 检查是否有未完成的日期，更新 currentDay
      const today = startOfDay(new Date());
      const startDate = startOfDay(parseISO(savedProgress.startDate));
      const daysSinceStart = differenceInDays(today, startDate) + 1;

      // 计算当前应该在第几天
      let newCurrentDay = Math.min(daysSinceStart, TOTAL_DAYS);

      // 如果第 newCurrentDay 已经完成了，找下一个未完成的天
      while (
        newCurrentDay <= TOTAL_DAYS &&
        savedProgress.completedDays.includes(newCurrentDay)
      ) {
        newCurrentDay++;
      }

      set({
        progress: {
          ...savedProgress,
          currentDay: newCurrentDay > TOTAL_DAYS ? TOTAL_DAYS : newCurrentDay,
        },
        isLoading: false,
      });
    } else {
      // 创建新的进度
      const newProgress: UserProgress = {
        startDate: new Date().toISOString(),
        completedDays: [],
        currentDay: 1,
        dailyTasks: [],
        lastVisitDate: new Date().toISOString(),
      };

      safeLocalStorageSet('30day_user_progress', newProgress);
      set({ progress: newProgress, isLoading: false });
    }
  },

  // 重置进度
  resetProgress: () => {
    safeLocalStorageRemove('30day_user_progress');
    safeLocalStorageRemove('30day_visited_date');

    set({
      progress: null,
      currentQuote: null,
      showBookmark: false,
    });
  },

  // 获取当日任务
  getDailyTask: (allTasks: SmallTask[]) => {
    const { progress } = get();
    if (!progress) throw new Error('进度未初始化');

    const { currentDay, dailyTasks } = progress;

    // 检查是否已有当日任务
    let taskRecord = dailyTasks.find(t => t.dayIndex === currentDay);

    if (!taskRecord) {
      // 生成新任务
      const usedTaskIds = dailyTasks.map(t => t.taskId);
      const availableTasks = allTasks.filter(t => !usedTaskIds.includes(t.id));

      if (availableTasks.length === 0) {
        throw new Error('没有可用的小事任务');
      }

      const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];

      taskRecord: DailyTaskRecord = {
        dayIndex: currentDay,
        taskId: randomTask.id,
        taskContent: randomTask.content,
        taskCategory: randomTask.category,
        isCompleted: false,
        switchCount: 0,
        switchHistory: [randomTask.id],
      };

      // 更新进度
      const updatedProgress: UserProgress = {
        ...progress,
        dailyTasks: [...dailyTasks, taskRecord],
      };

      safeLocalStorageSet('30day_user_progress', updatedProgress);
      set({ progress: updatedProgress });

      return taskRecord;
    }

    return taskRecord;
  },

  // 切换当日任务
  switchDailyTask: (newTask: SmallTask) => {
    const { progress } = get();
    if (!progress) throw new Error('进度未初始化');

    const { currentDay, dailyTasks } = progress;
    const taskRecord = dailyTasks.find(t => t.dayIndex === currentDay);

    if (!taskRecord) throw new Error('未找到当日任务');

    // 检查切换次数
    const today = new Date().toDateString();
    if (taskRecord.switchCount >= MAX_SWITCHES_PER_DAY) {
      throw new Error('今日切换次数已用完');
    }

    // 检查是否已打卡
    if (taskRecord.isCompleted) {
      throw new Error('已打卡的任务不能切换');
    }

    // 更新任务记录
    const updatedTask: DailyTaskRecord = {
      ...taskRecord,
      taskId: newTask.id,
      taskContent: newTask.content,
      taskCategory: newTask.category,
      switchCount: taskRecord.switchCount + 1,
      switchHistory: [...taskRecord.switchHistory, newTask.id],
      lastSwitchDate: today,
    };

    const updatedTasks = dailyTasks.map(t =>
      t.dayIndex === currentDay ? updatedTask : t
    );

    const updatedProgress: UserProgress = {
      ...progress,
      dailyTasks: updatedTasks,
    };

    safeLocalStorageSet('30day_user_progress', updatedProgress);
    set({ progress: updatedProgress });
  },

  // 完成打卡
  completeTask: (quote: HealingQuote) => {
    const { progress } = get();
    if (!progress) throw new Error('进度未初始化');

    const { currentDay, dailyTasks } = progress;
    const taskRecord = dailyTasks.find(t => t.dayIndex === currentDay);

    if (!taskRecord) throw new Error('未找到当日任务');
    if (taskRecord.isCompleted) throw new Error('今日已打卡');

    // 更新任务为完成状态
    const updatedTask: DailyTaskRecord = {
      ...taskRecord,
      isCompleted: true,
      completedAt: new Date().toISOString(),
    };

    const updatedTasks = dailyTasks.map(t =>
      t.dayIndex === currentDay ? updatedTask : t
    );

    const newCompletedDays = [...progress.completedDays, currentDay];

    // 检查是否全部完成
    const isAllCompleted = newCompletedDays.length >= TOTAL_DAYS;

    const updatedProgress: UserProgress = {
      ...progress,
      completedDays: newCompletedDays,
      dailyTasks: updatedTasks,
      currentDay: isAllCompleted ? TOTAL_DAYS : currentDay + 1,
    };

    safeLocalStorageSet('30day_user_progress', updatedProgress);

    set({
      progress: updatedProgress,
      currentQuote: quote,
      showBookmark: true,
    });
  },

  // 关闭书签弹窗
  closeBookmark: () => {
    set({ showBookmark: false, currentQuote: null });
  },

  // 检查是否新的一天
  checkNewDay: () => {
    const { progress } = get();
    if (!progress) return false;

    const today = new Date().toDateString();
    const lastVisit = progress.lastVisitDate
      ? parseISO(progress.lastVisitDate).toDateString()
      : '';

    const isNewDay = today !== lastVisit;

    if (isNewDay) {
      const updatedProgress: UserProgress = {
        ...progress,
        lastVisitDate: new Date().toISOString(),
      };
      safeLocalStorageSet('30day_user_progress', updatedProgress);
      set({ progress: updatedProgress });
    }

    return isNewDay;
  },

  // 获取进度百分比
  getProgressPercent: () => {
    const { progress } = get();
    if (!progress) return 0;

    return Math.round((progress.completedDays.length / TOTAL_DAYS) * 100);
  },

  // 获取连续打卡天数
  getStreakDays: () => {
    const { progress } = get();
    if (!progress) return 0;

    const { completedDays } = progress;
    if (completedDays.length === 0) return 0;

    let streak = 0;
    let expectedDay = completedDays[completedDays.length - 1];

    for (let i = completedDays.length - 1; i >= 0; i--) {
      if (completedDays[i] === expectedDay) {
        streak++;
        expectedDay--;
      } else {
        break;
      }
    }

    return streak;
  },
}));

// ============ 导出辅助函数 ============

export function getProgressFromStorage(): UserProgress | null {
  return safeLocalStorageGet<UserProgress | null>('30day_user_progress', null);
}

export function saveProgressToStorage(progress: UserProgress): void {
  safeLocalStorageSet('30day_user_progress', progress);
}
