import { useStore } from '@/store';
import { Modal } from './ui/Modal';
import { MOOD_EMOJIS } from '@/store/types';
import { Sparkles, Heart } from 'lucide-react';

export function BookmarkModal() {
  const showBookmark = useStore(state => state.showBookmark);
  const currentQuote = useStore(state => state.currentQuote);
  const closeBookmark = useStore(state => state.closeBookmark);

  if (!showBookmark || !currentQuote) return null;

  return (
    <Modal isOpen={showBookmark} onClose={closeBookmark}>
      <div className="p-8 text-center">
        {/* 装饰图标 */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto animate-bounce-soft">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* 表情符号 */}
        <div className="text-4xl mb-4">
          {MOOD_EMOJIS[currentQuote.mood]}
        </div>

        {/* 治愈文案 */}
        <div className="space-y-4 mb-6">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
            {currentQuote.content}
          </p>
        </div>

        {/* 装饰元素 */}
        <div className="flex items-center justify-center gap-2 text-primary-foreground">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">今日打卡成功</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* 关闭提示 */}
        <p className="mt-6 text-sm text-muted-foreground">
          点击空白处或 × 关闭
        </p>
      </div>
    </Modal>
  );
}
