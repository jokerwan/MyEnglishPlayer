import type { StudyPlanCoverVariant } from '@/types/studyPlan';

export type StudyCollectionSource = 'upload' | 'listening' | 'favorites' | 'manual';

export type StudyCollection = {
  id: string;
  title: string;
  cover: string;
  coverVariant: StudyPlanCoverVariant;
  source: StudyCollectionSource;
  updatedAt: string;
  isDefault?: boolean;
  linkedFolderName?: string;
};

export type CollectionMembership = {
  collectionId: string;
  resourceId: string;
  progress: number;
  done: boolean;
  updatedAt: string;
};

export type UploadResourcePayload = {
  title: string;
  folderId: string;
  folderName: string;
  type: 'video' | 'audio';
  duration?: string;
  level: '初级' | '中级' | '高级';
  hasSubtitle: boolean;
  tag: string;
};

export type CollectionPickerMode = 'add' | 'remove';

export type CollectionPickerRequest = {
  mode: CollectionPickerMode;
  resourceIds: string[];
  folderNames: string[];
};
