import type { StudyPlan } from '@/types/studyPlan';

export const mockStudyPlans: StudyPlan[] = [
  {
    id: 'body',
    title: '身体部位英语启蒙',
    cover: 'Body',
    coverVariant: 'indigo',
    status: 'learning',
    progress: 62,
    meta: '5个内容 · 已完成2个 · 上次听到06:18',
    updatedAt: '2026-06-09T08:18:00',
    resources: [
      {
        id: 'body-1',
        title: 'This Is My Body.mp4',
        meta: '15:20 · 初级 · 有字幕 · 12 个词句',
        progress: 62,
        updatedAt: '2026-06-09T08:18:00',
        done: false,
        cover: 'THI',
      },
      {
        id: 'body-2',
        title: 'Body Parts Chant.mp3',
        meta: '03:42 · 初级 · 有字幕 · 身体部位',
        progress: 42,
        updatedAt: '2026-06-09T07:52:00',
        done: false,
        cover: 'BOD',
      },
      {
        id: 'body-3',
        title: 'Colors for Kids.mp4',
        meta: '10:05 · 初级 · 有字幕 · 颜色词汇',
        progress: 15,
        updatedAt: '2026-06-08T20:10:00',
        done: false,
        cover: 'COL',
      },
    ],
  },
  {
    id: 'talk',
    title: '日常对话精听',
    cover: 'Talk',
    coverVariant: 'green',
    status: 'learning',
    progress: 25,
    meta: '18篇 · 学到第4篇 · 适合通勤精听',
    updatedAt: '2026-06-08T20:30:00',
    resources: [
      {
        id: 'talk-1',
        title: 'Daily Sentence Listening.mp3',
        meta: '04:12 · 日常对话 · 5 个表达',
        progress: 25,
        updatedAt: '2026-06-08T19:20:00',
        done: false,
        cover: 'VOA',
      },
      {
        id: 'talk-2',
        title: 'Daily Sentence Shadowing.mp3',
        meta: '05:38 · 跟读练习 · 8 个句子',
        progress: 18,
        updatedAt: '2026-06-08T19:30:00',
        done: false,
        cover: 'SEN',
      },
    ],
  },
  {
    id: 'news',
    title: '新闻慢速听力',
    cover: 'News',
    coverVariant: 'orange',
    status: 'learning',
    progress: 15,
    meta: '20篇 · 学到第2篇 · 每周3次泛听',
    updatedAt: '2026-06-07T09:10:00',
    resources: [
      {
        id: 'news-1',
        title: 'Unit 12 - Health and Life.mp3',
        meta: '04:12 · 慢速新闻 · 有字幕',
        progress: 15,
        updatedAt: '2026-06-07T09:10:00',
        done: false,
        cover: 'VOA',
      },
    ],
  },
  {
    id: 'bath',
    title: 'Bath Time 日常表达',
    cover: 'Daily',
    coverVariant: 'green',
    status: 'done',
    progress: 100,
    meta: '1 个音频 · 复听 4 次 · 收藏 8 个表达',
    updatedAt: '2026-06-04T19:00:00',
    resources: [
      {
        id: 'bath-1',
        title: 'Bath Time 日常表达.mp3',
        meta: '04:28 · 已完成 · 8 个表达',
        progress: 100,
        updatedAt: '2026-06-04T19:00:00',
        done: true,
        cover: 'BAT',
      },
    ],
  },
  {
    id: 'dino',
    title: 'Dinosaur Names',
    cover: 'Dino',
    coverVariant: 'orange',
    status: 'done',
    progress: 100,
    meta: '1 个视频 · 完成于昨天 · 可定期回炉复习',
    updatedAt: '2026-06-03T16:40:00',
    resources: [
      {
        id: 'dino-1',
        title: 'Dinosaur Names.mp4',
        meta: '08:30 · 已完成 · 恐龙词汇',
        progress: 100,
        updatedAt: '2026-06-03T16:40:00',
        done: true,
        cover: 'DIN',
      },
    ],
  },
];

export function getLearningPlans() {
  return mockStudyPlans.filter((plan) => plan.status === 'learning');
}

export function getStudyPlanById(planId: string) {
  return mockStudyPlans.find((plan) => plan.id === planId);
}

export function getStudyPlanByTitle(title: string) {
  return mockStudyPlans.find((plan) => plan.title === title);
}
