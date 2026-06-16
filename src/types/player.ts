export type PlayerState = {
  title: string;
  subtitle: string;
  cover: string;
  resourceId?: string;
  durationSeconds: number;
  currentTimeSeconds: number;
  isPlaying: boolean;
};
