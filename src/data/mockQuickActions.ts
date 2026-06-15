import type { QuickAction } from '@/types/home';

export const mockQuickActions: QuickAction[] = [
  {
    id: 'upload',
    label: '上传',
    icon: 'cloud-upload',
    tone: 'blue',
  },
  {
    id: 'resources',
    label: '资源',
    icon: 'folder-open-o',
    tone: 'green',
  },
  {
    id: 'favorites',
    label: '收藏',
    icon: 'bookmark-o',
    tone: 'amber',
  },
];
