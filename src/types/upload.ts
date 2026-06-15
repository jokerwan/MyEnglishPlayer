export type UploadDifficulty = '入门' | '适中' | '挑战';

export type UploadCategory =
  | '儿童启蒙'
  | '日常对话'
  | '绘本故事'
  | '新闻慢速'
  | '自定义';

export type UploadFolderOption = {
  id: string;
  name: string;
  description: string;
  resourceCount?: number;
  isDefault?: boolean;
};

export type UploadFormState = {
  mediaSelected: boolean;
  mediaFileName?: string;
  subtitleSelected: boolean;
  subtitleFileName?: string;
  resourceName: string;
  difficulty: UploadDifficulty;
  category: UploadCategory;
  folders: UploadFolderOption[];
  selectedFolderId: string;
  showNewFolderForm: boolean;
  newFolderName: string;
  mediaErrorVisible: boolean;
  nameErrorVisible: boolean;
  uploadSuccess: boolean;
  successFolderName?: string;
};
