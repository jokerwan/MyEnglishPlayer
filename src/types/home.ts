export type HomeMetricTone = 'blue' | 'green' | 'purple';

export type HomeMetric = {
  id: string;
  icon: 'headphones' | 'microphone' | 'quote-left';
  value: string;
  label: string;
  delta: string;
  tone: HomeMetricTone;
};

export type HomeStats = {
  trendLabel: string;
  weeklyListening: string;
  metrics: HomeMetric[];
};

export type QuickAction = {
  id: string;
  label: string;
  icon: 'cloud-upload' | 'folder-open-o' | 'bookmark-o';
  tone: 'blue' | 'green' | 'amber';
};
