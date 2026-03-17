# 数据存储设计

## 本地存储架构

本项目使用浏览器 LocalStorage 进行数据存储，无需后端数据库。

## 存储策略

### 数据存储位置

| 数据类型 | 存储方式 | 键名 |
|---------|---------|------|
| 用户进度 | LocalStorage | `30day_user_progress` |

### 数据生命周期

- **初始化**: 首次访问时创建新的 UserProgress
- **读取**: 每次页面加载时从 LocalStorage 读取
- **写入**: 每次状态变更后立即写入
- **清除**: 用户点击"重新开始"时清除

## 数据模型详细说明

### UserProgress

用户打卡进度的完整记录。

```typescript
{
  "startDate": "2024-01-01T00:00:00.000Z",  // 挑战开始日期
  "completedDays": [1, 2, 3],              // 已完成天数
  "currentDay": 4,                         // 当前第几天
  "dailyTasks": [                          // 每日任务记录数组
    {
      "dayIndex": 1,
      "taskId": "emotion-001",
      "taskContent": "写下三件今天让你感到开心的小事",
      "taskCategory": "emotion",
      "isCompleted": true,
      "completedAt": "2024-01-01T10:30:00.000Z",
      "switchCount": 0,
      "switchHistory": ["emotion-001"],
      "lastSwitchDate": undefined
    }
  ],
  "lastVisitDate": "2024-01-04T08:00:00.000Z"
}
```

## 数据完整性规则

### 1. 小事不重复

30 天内为用户生成的小事必须唯一：

```typescript
// 获取已使用的任务ID
const usedTaskIds = progress.dailyTasks.map(t => t.taskId);

// 筛选未使用的任务
const availableTasks = allTasks.filter(t => !usedTaskIds.includes(t.id));
```

### 2. 每日切换上限

每个自然日最多切换 3 次：

```typescript
const today = new Date().toDateString();
if (task.switchCount >= MAX_SWITCHES_PER_DAY) {
  throw new Error('今日切换次数已用完');
}
```

### 3. 每日打卡限制

一天只能打卡一次：

```typescript
if (taskRecord.isCompleted) {
  throw new Error('今日已打卡');
}
```

### 4. 日期重置

0 点重置切换次数：

```typescript
const today = new Date().toDateString();
const lastSwitchDate = taskRecord.lastSwitchDate;

if (lastSwitchDate !== today) {
  // 新的一天，重置切换次数判断
}
```

## 数据迁移策略

当前版本不涉及数据迁移，未来版本需要考虑：

1. 添加新字段时的默认值处理
2. 数据结构变更时的迁移脚本
3. 版本号标识与向后兼容

## 安全考虑

1. **敏感数据**: 本项目不存储敏感信息
2. **XSS 防护**: 对存储数据进行转义处理
3. **容量限制**: LocalStorage 有 5MB 限制，本项目数据量很小

## 异常处理

```typescript
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
```

## 未来扩展

如需支持云端同步，可考虑以下方案：

1. **IndexedDB**: 客户端数据库，支持更大数据量
2. **Cloudflare KV**: 边缘存储，全球分发
3. **Supabase**: 开源 Firebase 替代方案
4. **自定义后端**: REST API + PostgreSQL
