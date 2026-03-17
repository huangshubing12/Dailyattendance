import type { HealingQuote } from '@/store/types';

// ============ 治愈文案数据 ============
// 共 30+ 条治愈文案，覆盖温暖、鼓励、平静、希望四种情绪

export const QUOTES: HealingQuote[] = [
  // 温暖类
  { id: 'warm-001', content: '你不需要成为完美的自己，你只需要做真实的自己。', mood: 'warm' },
  { id: 'warm-002', content: '今天的你已经很棒了，明天会更好。', mood: 'warm' },
  { id: 'warm-003', content: '每一个小小的坚持，都在慢慢改变着你。', mood: 'warm' },
  { id: 'warm-004', content: '你的存在本身就是一种美好。', mood: 'warm' },
  { id: 'warm-005', content: '给自己一点温柔，你值得。', mood: 'warm' },
  { id: 'warm-006', content: '阳光不问赶路人，时光不负有心人。', mood: 'warm' },
  { id: 'warm-007', content: '你的每一份努力，都在为未来铺路。', mood: 'warm' },
  { id: 'warm-008', content: '相信自己的力量，你比想象中更强大。', mood: 'warm' },

  // 鼓励类
  { id: 'encourage-001', content: '再坚持一下，美好正在路上。', mood: 'encourage' },
  { id: 'encourage-002', content: '每一步前进，都值得被记录。', mood: 'encourage' },
  { id: 'encourage-003', content: '你的潜力无限，别让任何人定义你。', mood: 'encourage' },
  { id: 'encourage-004', content: '勇敢一点，你已经做好了准备。', mood: 'encourage' },
  { id: 'encourage-005', content: '不怕慢，只怕站。继续前行！', mood: 'encourage' },
  { id: 'encourage-006', content: '每一次尝试，都是一次成长。', mood: 'encourage' },
  { id: 'encourage-007', content: '你比你想象的要勇敢得多。', mood: 'encourage' },
  { id: 'encourage-008', content: '坚持下去，你会感谢现在的自己。', mood: 'encourage' },

  // 平静类
  { id: 'calm-001', content: '深呼吸，一切都会好起来的。', mood: 'calm' },
  { id: 'calm-002', content: '慢慢来，比较快。', mood: 'calm' },
  { id: 'calm-003', content: '允许自己偶尔的脆弱，那是正常的。', mood: 'calm' },
  { id: 'calm-004', content: '当下的每一刻，都值得珍惜。', mood: 'calm' },
  { id: 'calm-005', content: '放轻松，你已经做得很好了。', mood: 'calm' },
  { id: 'calm-006', content: '心静自然凉，烦恼会随风而散。', mood: 'calm' },
  { id: 'calm-007', content: '接纳不完美的自己，也是一种完美。', mood: 'calm' },
  { id: 'calm-008', content: '安静下来，听听内心的声音。', mood: 'calm' },

  // 希望类
  { id: 'hope-001', content: '美好的事情，正在悄悄发生。', mood: 'hope' },
  { id: 'hope-002', content: '今天的努力，是明天的礼物。', mood: 'hope' },
  { id: 'hope-003', content: '相信未来，它一定值得期待。', mood: 'hope' },
  { id: 'hope-004', content: '每一个结束，都是新的开始。', mood: 'hope' },
  { id: 'hope-005', content: '保持热爱，奔赴山海。', mood: 'hope' },
  { id: 'hope-006', content: '未来可期，我们继续前行。', mood: 'hope' },
  { id: 'hope-007', content: '你的梦想，值得被守护。', mood: 'hope' },
  { id: 'hope-008', content: '新的一天，新的希望。', mood: 'hope' },
];

/**
 * 根据情绪获取文案
 */
export function getQuotesByMood(mood: string): HealingQuote[] {
  return QUOTES.filter(quote => quote.mood === mood);
}

/**
 * 获取随机文案
 */
export function getRandomQuote(): HealingQuote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

/**
 * 根据ID获取文案
 */
export function getQuoteById(id: string): HealingQuote | undefined {
  return QUOTES.find(quote => quote.id === id);
}
