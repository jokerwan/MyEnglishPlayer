export type HomeRecommendation = {
  id: string;
  title: string;
  resourceCount: number;
  gradient: [string, string];
  icon: 'briefcase' | 'plane' | 'microphone' | 'film';
};

export const mockHomeRecommendations: HomeRecommendation[] = [
  {
    id: 'workplace',
    title: '职场沟通技巧',
    resourceCount: 12,
    gradient: ['#0f766e', '#2dd4bf'],
    icon: 'briefcase',
  },
  {
    id: 'travel',
    title: '旅行英语听力',
    resourceCount: 8,
    gradient: ['#0369a1', '#38bdf8'],
    icon: 'plane',
  },
  {
    id: 'ted',
    title: 'TED 精选演讲',
    resourceCount: 15,
    gradient: ['#6d28d9', '#c4b5fd'],
    icon: 'microphone',
  },
  {
    id: 'movie',
    title: '影视原声训练',
    resourceCount: 10,
    gradient: ['#0e7490', '#67e8f9'],
    icon: 'film',
  },
];
