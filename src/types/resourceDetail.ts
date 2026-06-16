import type { ResourceLevel, ResourceStudyStatus, ResourceType } from '@/types/resource';

export type TranscriptLine = {
  time: string;
  en: string;
  zh: string;
};

export type KeywordChip = {
  en: string;
  zh: string;
};

export type ResourceStudyStats = {
  listenCount: number;
  shadowCount: number;
  savedPhraseCount: number;
  note: string;
};

export type ResourceDetail = {
  id: string;
  title: string;
  folder: string;
  type: ResourceType;
  duration: string;
  durationSeconds: number;
  level: ResourceLevel;
  hasSubtitle: boolean;
  tag: string;
  studyStatus: ResourceStudyStatus;
  progress: number;
  cover: string;
  transcript: TranscriptLine[];
  words: KeywordChip[];
  stats: ResourceStudyStats;
};

export type ResourceInfoTab = 'notes' | 'words' | 'stats';
