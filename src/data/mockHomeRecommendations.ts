export type HomeRecommendation = {
  id: string;
  title: string;
  resourceCount: number;
  gradient: [string, string];
};

export const mockHomeRecommendations: HomeRecommendation[] = [
  {
    id: 'workplace',
    title: '职场沟通技巧',
    resourceCount: 12,
    gradient: ['#0f766e', '#5eead4'],
  },
  {
    id: 'travel',
    title: '旅行英语听力',
    resourceCount: 8,
    gradient: ['#0369a1', '#7dd3fc'],
  },
  {
    id: 'ted',
    title: 'TED 精选演讲',
    resourceCount: 15,
    gradient: ['#7c3aed', '#c4b5fd'],
  },
  {
    id: 'movie',
    title: '影视原声训练',
    resourceCount: 10,
    gradient: ['#0891b2', '#a5f3fc'],
  },
];
