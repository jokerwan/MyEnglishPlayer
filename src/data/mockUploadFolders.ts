import type { UploadFolderOption } from '@/types/upload';

export const mockUploadFolders: UploadFolderOption[] = [
  {
    id: 'default',
    name: '默认文件夹',
    description: '不选择时自动保存到这里',
    isDefault: true,
  },
  {
    id: 'english-kids',
    name: '英语启蒙',
    description: '12 个资源',
    resourceCount: 12,
  },
  {
    id: 'family-daily',
    name: '亲子日常',
    description: '8 个资源',
    resourceCount: 8,
  },
];
