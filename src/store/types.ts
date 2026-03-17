// ============ 核心类型定义 ============

/**
 * 小事数据
 */
export interface SmallTask {
  id: string;
  content: string;
  category: TaskCategory;
}

/**
 * 事情类别
 */
export type TaskCategory = 'emotion' | 'body' | 'social' | 'growth' | 'rest';

/**
 * 治愈文案
 */
export interface HealingQuote {
  id: string;
  content: string;
  mood: QuoteMood;
}

/**
 * 文案情绪类型
 */
export type QuoteMood = 'warm' | 'encourage' | 'calm' | 'hope';

/**
 * 每日任务记录
 */
export interface DailyTaskRecord {
  dayIndex: number;              // 第几天 (1-30)
  taskId: string;                // 小事ID
  taskContent: string;          // 小事内容
  taskCategory: TaskCategory;   // 小事类别
  isCompleted: boolean;          // 是否已打卡
  completedAt?: string;          // 打卡时间 (ISO格式)
  switchCount: number;           // 切换次数
  switchHistory: string[];       // 切换历史（taskId数组）
  lastSwitchDate?: string;      // 最后切换日期 (YYYY-MM-DD)
}

/**
 * 用户打卡进度
 */
export interface UserProgress {
  startDate: string;              // 挑战开始日期 (ISO格式)
  completedDays: number[];        // 已完成的天数索引 (1-30)
  currentDay: number;            // 当前第几天 (1-30)
  dailyTasks: DailyTaskRecord[]; // 每日任务记录
  lastVisitDate?: string;        // 最后访问日期 (YYYY-MM-DD)
}

/**
 * 应用状态
 */
export interface AppState {
  // 用户进度
  progress: UserProgress | null;

  // 当前显示的治愈文案
  currentQuote: HealingQuote | null;

  // 是否显示书签弹窗
  showBookmark: boolean;

  // 加载状态
  isLoading: boolean;

  // 初始化
  initProgress: () => void;

  // 重置进度
  resetProgress: () => void;

  // 获取当日任务
  getDailyTask: (allTasks: SmallTask[]) => DailyTaskRecord;

  // 切换当日任务
  switchDailyTask: (newTask: SmallTask) => void;

  // 完成打卡
  completeTask: (quote: HealingQuote) => void;

  // 关闭书签弹窗
  closeBookmark: () => void;

  // 检查是否新的一天
  checkNewDay: () => boolean;

  // 获取进度百分比
  getProgressPercent: () => number;

  // 获取连续打卡天数
  getStreakDays: () => number;
}

// ============ 本地存储键名 ============

export const STORAGE_KEYS = {
  USER_PROGRESS: '30day_user_progress',
  VISITED_DATE: '30day_visited_date',
} as const;

// ============ 常量 ============

export const TOTAL_DAYS = 30;
export const MAX_SWITCHES_PER_DAY = 3;
export const TASK_CATEGORIES: TaskCategory[] = ['emotion', 'body', 'social', 'growth', 'rest'];

export const CATEGORY_NAMES: Record<TaskCategory, string> = {
  emotion: '情绪',
  body: '身体',
  social: '社交',
  growth: '成长',
  rest: '休息',
};

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  emotion: '#FFB5C5', // 粉色
  body: '#98D8C8',    // 青色
  social: '#FFD93D',  // 黄色
  growth: '#A8D8EA',  // 蓝色
  rest: '#F5E6D3',    // 米色
};

export const MOOD_EMOJIS: Record<QuoteMood, string> = {
  warm: '🌸',
  encourage: '💪',
  calm: '🍃',
  hope: '✨',
};
