import { seedFolders, seedResources } from '@/data/seedLibrary';
import type { ResourceLibraryFolder, ResourceLibraryItem } from '@/types/resource';

export const mockResourceFolders: ResourceLibraryFolder[] = seedFolders;
export const mockResourceItems: ResourceLibraryItem[] = seedResources;
export const DEFAULT_RESOURCE_FOLDER_NAME = '默认文件夹';

export const RESOURCE_TYPE_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'video', label: '视频' },
  { id: 'audio', label: '音频' },
  { id: 'subtitle', label: '字幕' },
] as const;
