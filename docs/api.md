type DailyTaskRecord = {
  id: string
  date: string
  completed: boolean
}
# API 文档

当前版本使用 LocalStorage 进行本地数据存储，API 预留用于未来云端同步扩展。

## 本地存储

### 存储键名

| 键名 | 类型 | 说明 |
|------|------|------|
| `30day_user_progress` | UserProgress | 用户打卡进度 |

### 数据模型

#### UserProgress

```typescript
interface UserProgress {
  startDate: string;              // 挑战开始日期 (ISO格式)
  completedDays: number[];        // 已完成的天数索引 (1-30)
  currentDay: number;            // 当前第几天 (1-30)
  dailyTasks: DailyTaskRecord[]; // 每日任务记录
  lastVisitDate?: string;        // 最后访问日期 (YYYY-MM-DD)
}
```

#### DailyTaskRecord

```typescript
interface DailyTaskRecord {
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
```

#### SmallTask

```typescript
interface SmallTask {
  id: string;
  content: string;
  category: TaskCategory;
}
```

#### TaskCategory

```typescript
type TaskCategory = 'emotion' | 'body' | 'social' | 'growth' | 'rest';
```

#### HealingQuote

```typescript
interface HealingQuote {
  id: string;
  content: string;
  mood: QuoteMood;
}
```

#### QuoteMood

```typescript
type QuoteMood = 'warm' | 'encourage' | 'calm' | 'hope';
```

## Store Actions

### initProgress

初始化用户进度，从 LocalStorage 读取或创建新进度。

```typescript
initProgress(): void
```

### getDailyTask

获取当日任务，如果不存在则生成新任务。

```typescript
getDailyTask(allTasks: SmallTask[]): DailyTaskRecord
```

### switchDailyTask

切换当日任务，限制每日最多 3 次。

```typescript
switchDailyTask(newTask: SmallTask): void
```

### completeTask

完成打卡任务，更新进度并显示治愈书签。

```typescript
completeTask(quote: HealingQuote): void
```

### resetProgress

重置所有进度数据。

```typescript
resetProgress(): void
```

### getProgressPercent

获取完成进度百分比。

```typescript
getProgressPercent(): number
```

### getStreakDays

获取连续打卡天数。

```typescript
getStreakDays(): number
```

## 未来扩展 API（预留）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/tasks` | 获取所有小事列表 |
| GET | `/api/quotes` | 获取治愈文案 |
| POST | `/api/sync` | 数据同步（未来） |
| GET | `/api/progress` | 获取用户进度 |
| POST | `/api/progress` | 保存用户进度 |
