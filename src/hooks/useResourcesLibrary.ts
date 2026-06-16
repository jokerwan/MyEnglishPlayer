import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DEFAULT_RESOURCE_FOLDER_NAME,
  mockResourceFolders,
  mockResourceItems,
} from '@/data/mockResources';
import type { ResourceLibraryFolder, ResourceLibraryItem } from '@/types/resource';
import { buildFolderViewModel } from '@/utils/resourceLibrary';
import {
  buildVisibleTreeFolders,
  normalizedResourceSearch,
} from '@/utils/resourceTree';

export function useResourcesLibrary() {
  const [resources, setResources] = useState<ResourceLibraryItem[]>(mockResourceItems);
  const [folders, setFolders] = useState<ResourceLibraryFolder[]>(mockResourceFolders);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [collapsedFolderNames, setCollapsedFolderNames] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedFolderNames, setSelectedFolderNames] = useState<string[]>([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const initializedExpandedRef = useRef(false);

  const query = normalizedResourceSearch(searchQuery);

  const folderViewModels = useMemo(
    () => folders.map((folder) => buildFolderViewModel(folder, resources)),
    [folders, resources],
  );

  const visibleTreeEntries = useMemo(
    () => buildVisibleTreeFolders(folderViewModels, resources, query),
    [folderViewModels, query, resources],
  );

  useEffect(() => {
    if (initializedExpandedRef.current || visibleTreeEntries.length === 0) {
      return;
    }
    initializedExpandedRef.current = true;
    const namesWithResources = visibleTreeEntries
      .filter((entry) => entry.folder.resourceCount > 0)
      .map((entry) => entry.folder.name);
    setCollapsedFolderNames(
      visibleTreeEntries
        .map((entry) => entry.folder.name)
        .filter((name) => !namesWithResources.includes(name)),
    );
  }, [visibleTreeEntries]);

  useEffect(() => {
    if (!query) {
      return;
    }
    const matchedFolderNames = visibleTreeEntries
      .filter((entry) => entry.folderMatched || entry.visibleResources.length > 0)
      .map((entry) => entry.folder.name);
    setCollapsedFolderNames((current) =>
      current.filter((name) => !matchedFolderNames.includes(name)),
    );
  }, [query, visibleTreeEntries]);

  const visibleResourceEntries = useMemo(
    () =>
      visibleTreeEntries.flatMap((entry) =>
        entry.visibleResources.map((resource) => ({
          folderName: entry.folder.name,
          resource,
        })),
      ),
    [visibleTreeEntries],
  );

  const clearSelection = useCallback(() => {
    setSelectedFolderNames([]);
    setSelectedResourceIds([]);
  }, []);

  const enterSelectMode = useCallback(() => {
    setSelectMode(true);
  }, []);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    clearSelection();
  }, [clearSelection]);

  const isFolderExpanded = useCallback(
    (folderName: string) => !collapsedFolderNames.includes(folderName),
    [collapsedFolderNames],
  );

  const toggleFolderExpanded = useCallback((folderName: string) => {
    setCollapsedFolderNames((current) =>
      current.includes(folderName)
        ? current.filter((name) => name !== folderName)
        : [...current, folderName],
    );
  }, []);

  const isFolderSelected = useCallback(
    (folderName: string, visibleResourceIds: string[]) => {
      if (selectedFolderNames.includes(folderName)) {
        return true;
      }
      if (visibleResourceIds.length === 0) {
        return false;
      }
      return visibleResourceIds.every((resourceId) => selectedResourceIds.includes(resourceId));
    },
    [selectedFolderNames, selectedResourceIds],
  );

  const isFolderPartial = useCallback(
    (folderName: string, visibleResourceIds: string[]) => {
      if (isFolderSelected(folderName, visibleResourceIds)) {
        return false;
      }
      const selectedCount = visibleResourceIds.filter((resourceId) =>
        selectedResourceIds.includes(resourceId),
      ).length;
      return selectedCount > 0;
    },
    [isFolderSelected, selectedResourceIds],
  );

  const isResourceSelected = useCallback(
    (resourceId: string) => selectedResourceIds.includes(resourceId),
    [selectedResourceIds],
  );

  const toggleFolderSelect = useCallback((folderName: string, visibleResourceIds: string[]) => {
    setSelectedFolderNames((current) => {
      const selected = current.includes(folderName);
      if (selected) {
        setSelectedResourceIds((ids) => ids.filter((id) => !visibleResourceIds.includes(id)));
        return current.filter((name) => name !== folderName);
      }
      setSelectedResourceIds((ids) => Array.from(new Set([...ids, ...visibleResourceIds])));
      return [...current, folderName];
    });
  }, []);

  const toggleResourceSelect = useCallback(
    (folderName: string, resourceId: string, visibleResourceIds: string[]) => {
      setSelectedResourceIds((current) => {
        const next = current.includes(resourceId)
          ? current.filter((id) => id !== resourceId)
          : [...current, resourceId];
        const allChildrenSelected =
          visibleResourceIds.length > 0 &&
          visibleResourceIds.every((id) => next.includes(id));
        setSelectedFolderNames((folderNames) => {
          if (allChildrenSelected) {
            return folderNames.includes(folderName) ? folderNames : [...folderNames, folderName];
          }
          return folderNames.filter((name) => name !== folderName);
        });
        return next;
      });
    },
    [],
  );

  const allVisibleSelected = useMemo(() => {
    if (visibleTreeEntries.length === 0 && visibleResourceEntries.length === 0) {
      return false;
    }
    const allFoldersSelected = visibleTreeEntries.every((entry) =>
      isFolderSelected(
        entry.folder.name,
        entry.visibleResources.map((resource) => resource.id),
      ),
    );
    const allResourcesSelected = visibleResourceEntries.every((entry) =>
      selectedResourceIds.includes(entry.resource.id),
    );
    return allFoldersSelected && allResourcesSelected;
  }, [isFolderSelected, selectedResourceIds, visibleResourceEntries, visibleTreeEntries]);

  const selectAllVisible = useCallback(() => {
    if (allVisibleSelected) {
      clearSelection();
      return;
    }
    setSelectedFolderNames(visibleTreeEntries.map((entry) => entry.folder.name));
    setSelectedResourceIds(visibleResourceEntries.map((entry) => entry.resource.id));
  }, [allVisibleSelected, clearSelection, visibleResourceEntries, visibleTreeEntries]);

  const toggleNewFolderForm = useCallback(() => {
    setShowNewFolderForm((current) => !current);
  }, []);

  const addFolder = useCallback(() => {
    const folderName = newFolderName.trim() || '新建文件夹';
    const exists = folders.some((folder) => folder.name === folderName);
    if (exists) {
      return { ok: false as const, message: '文件夹已存在' };
    }

    const newFolder: ResourceLibraryFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      icon: 'folder-o',
      gradient: ['#14b8a6', '#99f6e4'],
      isUserCreated: true,
    };

    setFolders((current) => [...current, newFolder]);
    setNewFolderName('');
    setShowNewFolderForm(false);
    setCollapsedFolderNames((current) => current.filter((name) => name !== folderName));

    return { ok: true as const, message: `已新建文件夹：${folderName}`, folderName };
  }, [folders, newFolderName]);

  const toggleFolderStudy = useCallback(
    (folderName: string) => {
      const folderResources = resources.filter((item) => item.folder === folderName);
      if (!folderResources.length) {
        return { ok: false as const, message: '该文件夹暂无资源' };
      }

      const joinedItems = folderResources.filter((item) => item.studyStatus !== 'none');
      const shouldCancel = joinedItems.length > 0;

      setResources((current) =>
        current.map((item) => {
          if (item.folder !== folderName) {
            return item;
          }
          if (shouldCancel) {
            return { ...item, studyStatus: 'none' };
          }
          return item.studyStatus === 'none' ? { ...item, studyStatus: 'learning' } : item;
        }),
      );

      return {
        ok: true as const,
        message: shouldCancel ? `已取消学习：${folderName}` : `已加入学习：${folderName}`,
      };
    },
    [resources],
  );

  const toggleResourceStudy = useCallback(
    (resourceId: string) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (!resource) {
        return { ok: false as const, message: '资源不存在' };
      }

      const shouldCancel = resource.studyStatus !== 'none';
      const cleanTitle = resource.title.replace(/\.(mp4|mp3|wav|m4a)$/i, '');

      setResources((current) =>
        current.map((item) => {
          if (item.id !== resourceId) {
            return item;
          }
          return {
            ...item,
            studyStatus: shouldCancel ? 'none' : 'learning',
          };
        }),
      );

      return {
        ok: true as const,
        message: shouldCancel ? `已取消学习：${cleanTitle}` : `已加入学习：${cleanTitle}`,
      };
    },
    [resources],
  );

  const bulkAddToStudy = useCallback(() => {
    if (selectedFolderNames.length === 0 && selectedResourceIds.length === 0) {
      return { ok: false as const, message: '请先选择文件夹或资源' };
    }

    setResources((current) =>
      current.map((item) => {
        const selectedByFolder = selectedFolderNames.includes(item.folder);
        const selectedById = selectedResourceIds.includes(item.id);
        if (!selectedByFolder && !selectedById) {
          return item;
        }
        return item.studyStatus === 'none' ? { ...item, studyStatus: 'learning' } : item;
      }),
    );

    exitSelectMode();
    return { ok: true as const, message: '已加入所选内容到学习' };
  }, [exitSelectMode, selectedFolderNames, selectedResourceIds]);

  const bulkRemoveFromStudy = useCallback(() => {
    if (selectedFolderNames.length === 0 && selectedResourceIds.length === 0) {
      return { ok: false as const, message: '请先选择文件夹或资源' };
    }

    setResources((current) =>
      current.map((item) => {
        const selectedByFolder = selectedFolderNames.includes(item.folder);
        const selectedById = selectedResourceIds.includes(item.id);
        if (!selectedByFolder && !selectedById) {
          return item;
        }
        return item.studyStatus !== 'none' ? { ...item, studyStatus: 'none' } : item;
      }),
    );

    exitSelectMode();
    return { ok: true as const, message: '已取消所选内容的学习' };
  }, [exitSelectMode, selectedFolderNames, selectedResourceIds]);

  return {
    folders: folderViewModels,
    searchQuery,
    setSearchQuery,
    showNewFolderForm,
    newFolderName,
    setNewFolderName,
    toggleNewFolderForm,
    addFolder,
    visibleTreeEntries,
    isFolderExpanded,
    toggleFolderExpanded,
    selectMode,
    enterSelectMode,
    exitSelectMode,
    isFolderSelected,
    isFolderPartial,
    isResourceSelected,
    toggleFolderSelect,
    toggleResourceSelect,
    allVisibleSelected,
    selectAllVisible,
    toggleFolderStudy,
    toggleResourceStudy,
    bulkAddToStudy,
    bulkRemoveFromStudy,
    defaultFolderName: DEFAULT_RESOURCE_FOLDER_NAME,
  };
}
