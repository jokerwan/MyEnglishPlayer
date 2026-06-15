export type ResourceType = 'video' | 'audio';

export type ResourceStudyStatus = 'none' | 'learning' | 'done';

export type ResourceTypeFilter = 'all' | 'video' | 'audio' | 'subtitle';

export type ResourceLevel = '初级' | '中级' | '高级';

export type FolderStudyStatus = 'none' | 'learning' | 'done' | 'partial' | 'all-added';

export type ResourceLibraryItem = {
  id: string;
  title: string;
  folder: string;
  type: ResourceType;
  duration: string;
  level: ResourceLevel;
  hasSubtitle: boolean;
  tag: string;
  studyStatus: ResourceStudyStatus;
  searchTitle: string;
};

export type ResourceLibraryFolder = {
  id: string;
  name: string;
  icon: 'folder-open-o' | 'child' | 'video-camera' | 'microphone' | 'bookmark-o' | 'newspaper-o' | 'folder-o';
  gradient: [string, string];
  isUserCreated?: boolean;
};

export type ResourceFolderViewModel = ResourceLibraryFolder & {
  resourceCount: number;
  doneCount: number;
  learningCount: number;
  noneCount: number;
  studyStatus: FolderStudyStatus;
  statusLabel: string;
  metaText: string;
  progressPercent: number;
};

export type ResourceFolderStudyAction = {
  label: string;
  disabled: boolean;
  tone: 'default' | 'learning' | 'done';
  subtitle: string;
  progressPercent: number;
  progressText: string;
};
