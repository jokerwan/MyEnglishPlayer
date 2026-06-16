import { seedFolders } from '@/data/seedLibrary';
import type { UploadFolderOption } from '@/types/upload';

export const mockUploadFolders: UploadFolderOption[] = seedFolders.map((folder) => ({
  id: folder.id,
  name: folder.name,
  description:
    folder.id === 'default' ? '不选择时自动保存到这里' : `${folder.name}`,
  isDefault: folder.id === 'default',
}));
