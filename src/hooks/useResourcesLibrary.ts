import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAppData } from '@/hooks/useAppData';
import type { ResourceLibraryFolder } from '@/types/resource';
import { buildFolderViewModelWithMemberships } from '@/utils/libraryView';
import { buildVisibleTreeFolders, normalizedResourceSearch } from '@/utils/resourceTree';

export function useResourcesLibrary() {
  const appData = useAppData();
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
    () =>
      appData.folders.map((folder) =>
        buildFolderViewModelWithMemberships(folder, appData.resources, appData.memberships),
      ),
    [appData.folders, appData.memberships, appData.resources],
  );

  const visibleTreeEntries = useMemo(
    () => buildVisibleTreeFolders(folderViewModels, appData.resources, query),
    [appData.resources, folderViewModels, query],
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

  useEffect(() => {
    if (!appData.highlightResourceId) {
      return;
    }
    const resource = appData.resources.find((item) => item.id === appData.highlightResourceId);
    if (resource) {
      setCollapsedFolderNames((current) => current.filter((name) => name !== resource.folder));
    }
  }, [appData.highlightResourceId, appData.resources]);

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
    return appData.addFolder(newFolderName);
  }, [appData, newFolderName]);

  const openAddStudyPicker = useCallback(
    (resourceIds: string[], folderNames: string[]) => {
      appData.openCollectionPicker({
        mode: 'add',
        resourceIds,
        folderNames,
      });
    },
    [appData],
  );

  const openRemoveStudyPicker = useCallback(
    (resourceIds: string[]) => {
      appData.openCollectionPicker({
        mode: 'remove',
        resourceIds,
        folderNames: [],
      });
    },
    [appData],
  );

  const requestFolderStudy = useCallback(
    (folderName: string, resourceIds: string[]) => {
      const joinedCount = resourceIds.filter((id) => appData.isResourceInAnyCollection(id)).length;
      if (joinedCount > 0 && joinedCount >= resourceIds.length) {
        openRemoveStudyPicker(resourceIds);
        return;
      }
      openAddStudyPicker(resourceIds, [folderName]);
    },
    [appData, openAddStudyPicker, openRemoveStudyPicker],
  );

  const requestResourceStudy = useCallback(
    (resourceId: string, folderName: string) => {
      if (appData.isResourceInAnyCollection(resourceId)) {
        openRemoveStudyPicker([resourceId]);
        return;
      }
      openAddStudyPicker([resourceId], [folderName]);
    },
    [appData, openAddStudyPicker, openRemoveStudyPicker],
  );

  const requestBulkAddStudy = useCallback(() => {
    if (selectedFolderNames.length === 0 && selectedResourceIds.length === 0) {
      return { ok: false as const, message: '请先选择文件夹或资源' };
    }
    const resourceIds = Array.from(
      new Set([
        ...selectedResourceIds,
        ...appData.resources
          .filter((resource) => selectedFolderNames.includes(resource.folder))
          .map((resource) => resource.id),
      ]),
    );
    const folderNames = Array.from(
      new Set(
        resourceIds
          .map((id) => appData.resources.find((resource) => resource.id === id)?.folder)
          .filter((name): name is string => Boolean(name)),
      ),
    );
    openAddStudyPicker(resourceIds, folderNames);
    return { ok: true as const, message: '请选择要加入的学习合集' };
  }, [appData.resources, openAddStudyPicker, selectedFolderNames, selectedResourceIds]);

  const requestBulkRemoveStudy = useCallback(() => {
    if (selectedFolderNames.length === 0 && selectedResourceIds.length === 0) {
      return { ok: false as const, message: '请先选择文件夹或资源' };
    }
    const resourceIds = Array.from(
      new Set([
        ...selectedResourceIds,
        ...appData.resources
          .filter((resource) => selectedFolderNames.includes(resource.folder))
          .map((resource) => resource.id),
      ]),
    );
    openRemoveStudyPicker(resourceIds);
    return { ok: true as const, message: '请选择要从哪个合集移除' };
  }, [appData.resources, openRemoveStudyPicker, selectedFolderNames, selectedResourceIds]);

  const getResourceCollectionCount = useCallback(
    (resourceId: string) => appData.getResourceCollectionCount(resourceId),
    [appData],
  );

  const clearHighlight = useCallback(() => {
    appData.setHighlightResourceId(null);
  }, [appData]);

  return {
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
    requestFolderStudy,
    requestResourceStudy,
    requestBulkAddStudy,
    requestBulkRemoveStudy,
    getResourceCollectionCount,
    highlightResourceId: appData.highlightResourceId,
    clearHighlight,
    pickerRequest: appData.pickerRequest,
    closeCollectionPicker: appData.closeCollectionPicker,
  };
}
