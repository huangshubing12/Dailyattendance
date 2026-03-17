type DailyTaskRecord = {
  id: string
  date: string
  completed: boolean
}
# 每天一件小事 - 30天自愈式打卡小程序

通过 30 天持续、低压力的微小行动，帮助你找回生活掌控感，舒缓焦虑、重拾生活热情。

## 功能特性

- ✅ **每日小事随机生成** - 30 天内小事不重复，每日可切换 3 次
- ✅ **打卡完成** - 完成小事后点击打卡，获得正向反馈
- ✅ **治愈书签** - 打卡成功后弹出温暖治愈的文案
- ✅ **历史记录** - 查看 30 天完整打卡日历和列表
- ✅ **本地存储** - 数据存储在本地，无需登录注册
- ✅ **极简设计** - 温暖治愈的 UI，无学习成本

## 技术栈

- **前端框架**: Next.js 15 (App Router) + React 19
- **UI 组件**: Tailwind CSS + 自定义组件
- **状态管理**: Zustand
- **数据存储**: LocalStorage
- **部署方案**: CNB Cloud Native Build / Docker

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx         # 主页（打卡页）
│   ├── history/         # 历史记录页
│   └── layout.tsx       # 根布局
├── components/          # React 组件
│   ├── ui/              # 基础 UI 组件
│   ├── ProgressDisplay.tsx    # 30天进度展示
│   ├── DailyTaskCard.tsx      # 每日任务卡片
│   ├── HistoryList.tsx        # 历史记录列表
│   ├── CalendarView.tsx       # 日历视图
│   └── BookmarkModal.tsx      # 治愈书签弹窗
├── store/               # Zustand 状态管理
│   ├── index.ts         # 主 store
│   └── types.ts         # 类型定义
├── lib/                 # 工具函数
│   ├── tasks.ts         # 小事项数据
│   ├── quotes.ts        # 治愈文案数据
│   └── utils.ts         # 工具函数
└── hooks/               # React Hooks
    └── useLocalStorage.ts
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务

```bash
pnpm start
```

## 部署

### CNB 部署

使用 `cnb-build.yml` 配置文件部署到 CNB 平台。

### Docker 部署

```bash
# 构建镜像
docker build -f docker/Dockerfile -t 30day-self-healing .

# 运行容器
docker run -p 3000:3000 30day-self-healing
```

## 开发说明

### 数据结构

用户数据存储在 LocalStorage 中，键名为 `30day_user_progress`：

```typescript
interface UserProgress {
  startDate: string;              // 挑战开始日期
  completedDays: number[];        // 已完成的天数索引 (1-30)
  currentDay: number;            // 当前第几天 (1-30)
  dailyTasks: DailyTaskRecord[]; // 每日任务记录
  lastVisitDate?: string;        // 最后访问日期
}
```

### 业务规则

1. 小事不重复：30 天内为用户生成的小事必须唯一
2. 每日切换上限：每个自然日最多切换 3 次，0 点重置
3. 每日打卡限制：一天只能打卡一次，成功后不可更改
4. 数据本地化：用户记录默认存储在本地

## License

MIT
