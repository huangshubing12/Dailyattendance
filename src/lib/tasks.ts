import type { SmallTask } from '@/store/types';

// ============ 每日小事数据 ============
// 共 50+ 件小事，覆盖情绪、身体、社交、成长、休息五大类别

export const TASKS: SmallTask[] = [
  // 情绪类 (10件)
  { id: 'emotion-001', content: '写下三件今天让你感到开心的小事', category: 'emotion' },
  { id: 'emotion-002', content: '深呼吸10次，感受呼吸的节奏', category: 'emotion' },
  { id: 'emotion-003', content: '对着镜子微笑30秒', category: 'emotion' },
  { id: 'emotion-004', content: '写下最近的一个烦恼，然后撕掉它', category: 'emotion' },
  { id: 'emotion-005', content: '找一首能让你放松的音乐，完整听完', category: 'emotion' },
  { id: 'emotion-006', content: '回想一件让你自豪的往事', category: 'emotion' },
  { id: 'emotion-007', content: '给未来的自己写一句话', category: 'emotion' },
  { id: 'emotion-008', content: '放下手机，发呆10分钟', category: 'emotion' },
  { id: 'emotion-009', content: '夸奖一下今天的自己', category: 'emotion' },
  { id: 'emotion-010', content: '画一幅涂鸦，不需要有任何技巧', category: 'emotion' },

  // 身体类 (12件)
  { id: 'body-001', content: '喝够2000ml的水', category: 'body' },
  { id: 'body-002', content: '做10个深蹲', category: 'body' },
  { id: 'body-003', content: '拉伸5分钟，放松身体', category: 'body' },
  { id: 'body-004', content: '早睡1小时', category: 'body' },
  { id: 'body-005', content: '认真吃一顿饭，不要看手机', category: 'body' },
  { id: 'body-006', content: '做一次眼保健操', category: 'body' },
  { id: 'body-007', content: '整理你的桌面', category: 'body' },
  { id: 'body-008', content: '走5000步', category: 'body' },
  { id: 'body-009', content: '用热水泡脚15分钟', category: 'body' },
  { id: 'body-010', content: '做一次肩颈放松运动', category: 'body' },
  { id: 'body-011', content: '认真刷牙3分钟', category: 'body' },
  { id: 'body-012', content: '换一身干净舒适的衣服', category: 'body' },

  // 社交类 (10件)
  { id: 'social-001', content: '给一位好友发消息问候', category: 'social' },
  { id: 'social-002', content: '夸奖一个人的优点', category: 'social' },
  { id: 'social-003', content: '和身边的人聊5分钟', category: 'social' },
  { id: 'social-004', content: '回复一条消息，表达感谢', category: 'social' },
  { id: 'social-005', content: '分享一件有趣的事情', category: 'social' },
  { id: 'social-006', content: '给家人打个电话', category: 'social' },
  { id: 'social-007', content: '帮助一个人，做件小事', category: 'social' },
  { id: 'social-008', content: '认真倾听别人的话', category: 'social' },
  { id: 'social-009', content: '和陌生人说一声你好', category: 'social' },
  { id: 'social-010', content: '向别人学习一件事', category: 'social' },

  // 成长类 (10件)
  { id: 'growth-001', content: '阅读30分钟', category: 'growth' },
  { id: 'growth-002', content: '学一个新单词', category: 'growth' },
  { id: 'growth-003', content: '复盘今天的一件事', category: 'growth' },
  { id: 'growth-004', content: '看一个纪录片片段', category: 'growth' },
  { id: 'growth-005', content: '记录一个生活灵感', category: 'growth' },
  { id: 'growth-006', content: '整理一个文件夹', category: 'growth' },
  { id: 'growth-007', content: '学习一个小技能', category: 'growth' },
  { id: 'growth-008', content: '背一首古诗', category: 'growth' },
  { id: 'growth-009', content: '看一篇高质量文章', category: 'growth' },
  { id: 'growth-010', content: '制定一个小目标', category: 'growth' },

  // 休息类 (10件)
  { id: 'rest-001', content: '什么都不做，放空5分钟', category: 'rest' },
  { id: 'rest-002', content: '看一次日落或日出', category: 'rest' },
  { id: 'rest-003', content: '整理床铺，创造舒适环境', category: 'rest' },
  { id: 'rest-004', content: '点一支香薰或蜡烛', category: 'rest' },
  { id: 'rest-005', content: '晒10分钟太阳', category: 'rest' },
  { id: 'rest-006', content: '看一朵花、一棵树', category: 'rest' },
  { id: 'rest-007', content: '整理房间的一个角落', category: 'rest' },
  { id: 'rest-008', content: '听听白噪音', category: 'rest' },
  { id: 'rest-009', content: '做一个舒服的伸展', category: 'rest' },
  { id: 'rest-010', content: '享受一段安静时光', category: 'rest' },
];

/**
 * 根据类别获取任务
 */
export function getTasksByCategory(category: string): SmallTask[] {
  return TASKS.filter(task => task.category === category);
}

/**
 * 获取随机任务
 */
export function getRandomTask(): SmallTask {
  return TASKS[Math.floor(Math.random() * TASKS.length)];
}

/**
 * 根据ID获取任务
 */
export function getTaskById(id: string): SmallTask | undefined {
  return TASKS.find(task => task.id === id);
}
