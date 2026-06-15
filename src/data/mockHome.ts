import type { HomeStats } from '@/types/home';

export const mockHomeStats: HomeStats = {
  trendLabel: '稳定提升',
  metrics: [
    {
      id: 'listening',
      icon: 'headphones',
      value: '3.5h',
      label: '有效听力',
      delta: '较上周 +1.2h',
      tone: 'blue',
    },
    {
      id: 'shadowing',
      icon: 'microphone',
      value: '18句',
      label: '跟读复述',
      delta: '本周新增 +6句',
      tone: 'green',
    },
    {
      id: 'phrases',
      icon: 'quote-left',
      value: '12个',
      label: '词句积累',
      delta: '较上周 +10个',
      tone: 'purple',
    },
  ],
};
