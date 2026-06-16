import type { ResourceFolderViewModel, ResourceLibraryItem } from '@/types/resource';

import { buildFolderViewModel, getFolderResources } from './resourceLibrary';

export function normalizedResourceSearch(value: string) {
  return value.trim().toLowerCase();
}

export function stripResourceFileExtension(title: string) {
  return title.replace(/\.(mp4|mp3|wav|m4a)$/i, '');
}

export function getResourceMeta(item: ResourceLibraryItem) {
  const typeLabel = item.type === 'video' ? '视频' : '音频';
  const subtitleLabel = item.hasSubtitle ? '有字幕' : '无字幕';
  return `${typeLabel} · ${item.duration} · ${item.level} · ${subtitleLabel}`;
}

export function resourceMatchesSearch(item: ResourceLibraryItem, query: string, folderMatched: boolean) {
  if (!query) {
    return true;
  }
  if (folderMatched) {
    return true;
  }
  return (
    item.searchTitle.toLowerCase().includes(query) ||
    item.title.toLowerCase().includes(query) ||
    item.folder.toLowerCase().includes(query) ||
    item.tag.toLowerCase().includes(query)
  );
}

export function folderMatchesSearch(folderName: string, query: string) {
  return Boolean(query) && folderName.toLowerCase().includes(query);
}

export function collectFolderNames(
  folders: ResourceFolderViewModel[],
  resources: ResourceLibraryItem[],
) {
  const names: string[] = [];
  folders.forEach((folder) => {
    if (!names.includes(folder.name)) {
      names.push(folder.name);
    }
  });
  resources.forEach((item) => {
    if (!names.includes(item.folder)) {
      names.push(item.folder);
    }
  });
  return names;
}

export function buildVisibleTreeFolders(
  folders: ResourceFolderViewModel[],
  resources: ResourceLibraryItem[],
  query: string,
) {
  const folderNames = collectFolderNames(folders, resources);
  const folderMap = new Map(folders.map((folder) => [folder.name, folder]));

  return folderNames
    .map((folderName) => {
      const folder =
        folderMap.get(folderName) ??
        buildFolderViewModel(
          {
            id: `folder-${folderName}`,
            name: folderName,
            icon: 'folder-o',
            gradient: ['#f59e0b', '#fde68a'],
          },
          resources,
        );
      const folderResources = getFolderResources(resources, folderName);
      const folderMatched = folderMatchesSearch(folderName, query);
      const visibleResources = folderResources.filter((item) =>
        resourceMatchesSearch(item, query, folderMatched),
      );
      const shouldShow = query ? folderMatched || visibleResources.length > 0 : true;

      return {
        folder,
        visibleResources,
        folderMatched,
        shouldShow,
      };
    })
    .filter((entry) => entry.shouldShow);
}

export function getFolderStudyActionLabel(joinedCount: number, resourceCount: number) {
  if (resourceCount === 0) {
    return null;
  }
  return joinedCount > 0 ? '取消学习' : '加入学习';
}

export function getResourceStudyActionLabel(studyStatus: ResourceLibraryItem['studyStatus']) {
  return studyStatus === 'none' ? '加入学习' : '取消学习';
}

export function isResourceInStudy(studyStatus: ResourceLibraryItem['studyStatus']) {
  return studyStatus !== 'none';
}
