import { useCallback, useMemo, useState } from 'react';

import { useAppData } from '@/hooks/useAppData';
import type { StudyPlan, StudyPlanStatus } from '@/types/studyPlan';
import {
  countPlansByStatus,
  filterPlansByStatus,
  normalizedSearch,
  planMatchesSearch,
  sortPlans,
  treeResourceKey,
  updatePlanProgress,
  visibleTreeResources,
  type LearningSortOrder,
} from '@/utils/learningManager';

export function useLearningManager() {
  const appData = useAppData();
  const [statusFilter, setStatusFilter] = useState<StudyPlanStatus>('learning');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceSortOrder] = useState<LearningSortOrder>('asc');
  const [collapsedPlanIds, setCollapsedPlanIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [selectedResourceKeys, setSelectedResourceKeys] = useState<string[]>([]);
  const [expandCollectionId, setExpandCollectionId] = useState<string | null>(null);

  const plans = appData.studyPlans;
  const query = normalizedSearch(searchQuery);
  const counts = useMemo(() => countPlansByStatus(plans), [plans]);

  const visiblePlans = useMemo(() => {
    const filtered = filterPlansByStatus(plans, statusFilter).filter((plan) =>
      planMatchesSearch(plan, query),
    );
    return sortPlans(filtered, 'desc');
  }, [plans, query, statusFilter]);

  const visibleResourceEntries = useMemo(
    () =>
      visiblePlans.flatMap((plan) =>
        visibleTreeResources(plan, query, resourceSortOrder).map((resource) => ({
          plan,
          resource,
          key: treeResourceKey(plan.id, resource.id),
        })),
      ),
    [query, resourceSortOrder, visiblePlans],
  );

  const allVisibleSelected = useMemo(() => {
    if (visiblePlans.length === 0 && visibleResourceEntries.length === 0) {
      return false;
    }

    const allPlansSelected = visiblePlans.every((plan) => {
      if (selectedPlanIds.includes(plan.id)) {
        return true;
      }
      if (plan.resources.length === 0) {
        return false;
      }
      return plan.resources.every((resource) =>
        selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id)),
      );
    });

    const allResourcesSelected = visibleResourceEntries.every((entry) =>
      selectedResourceKeys.includes(entry.key),
    );

    return allPlansSelected && allResourcesSelected;
  }, [selectedPlanIds, selectedResourceKeys, visiblePlans, visibleResourceEntries]);

  const clearSelection = useCallback(() => {
    setSelectedPlanIds([]);
    setSelectedResourceKeys([]);
  }, []);

  const enterSelectMode = useCallback(() => {
    setSelectMode(true);
  }, []);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    clearSelection();
  }, [clearSelection]);

  const changeStatusFilter = useCallback(
    (value: StudyPlanStatus) => {
      setStatusFilter(value);
      exitSelectMode();
    },
    [exitSelectMode],
  );

  const isPlanExpanded = useCallback(
    (planId: string) => {
      if (expandCollectionId === planId) {
        return true;
      }
      return !collapsedPlanIds.includes(planId);
    },
    [collapsedPlanIds, expandCollectionId],
  );

  const togglePlanExpanded = useCallback((planId: string) => {
    setExpandCollectionId(null);
    setCollapsedPlanIds((current) =>
      current.includes(planId) ? current.filter((id) => id !== planId) : [...current, planId],
    );
  }, []);

  const expandCollection = useCallback((collectionId: string) => {
    setExpandCollectionId(collectionId);
    setCollapsedPlanIds((current) => current.filter((id) => id !== collectionId));
  }, []);

  const togglePlanSelect = useCallback(
    (planId: string) => {
      const plan = plans.find((item) => item.id === planId);
      if (!plan) {
        return;
      }

      const resourceKeys = plan.resources.map((resource) => treeResourceKey(planId, resource.id));
      setSelectedPlanIds((current) => {
        if (current.includes(planId)) {
          setSelectedResourceKeys((keys) => keys.filter((key) => !resourceKeys.includes(key)));
          return current.filter((id) => id !== planId);
        }
        setSelectedResourceKeys((keys) => Array.from(new Set([...keys, ...resourceKeys])));
        return [...current, planId];
      });
    },
    [plans],
  );

  const toggleResourceSelect = useCallback(
    (planId: string, resourceId: string) => {
      const plan = plans.find((item) => item.id === planId);
      if (!plan) {
        return;
      }

      const key = treeResourceKey(planId, resourceId);
      const resourceKeys = plan.resources.map((resource) => treeResourceKey(planId, resource.id));

      setSelectedResourceKeys((current) => {
        const next = current.includes(key)
          ? current.filter((item) => item !== key)
          : [...current, key];

        const allChildrenSelected =
          resourceKeys.length > 0 && resourceKeys.every((resourceKey) => next.includes(resourceKey));

        setSelectedPlanIds((planIds) => {
          if (allChildrenSelected) {
            return planIds.includes(planId) ? planIds : [...planIds, planId];
          }
          return planIds.filter((id) => id !== planId);
        });

        return next;
      });
    },
    [plans],
  );

  const isPlanSelected = useCallback(
    (plan: StudyPlan) => {
      if (selectedPlanIds.includes(plan.id)) {
        return true;
      }
      if (plan.resources.length === 0) {
        return false;
      }
      return plan.resources.every((resource) =>
        selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id)),
      );
    },
    [selectedPlanIds, selectedResourceKeys],
  );

  const isPlanPartial = useCallback(
    (plan: StudyPlan) => {
      if (isPlanSelected(plan)) {
        return false;
      }
      const selectedCount = plan.resources.filter((resource) =>
        selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id)),
      ).length;
      return selectedCount > 0;
    },
    [isPlanSelected, selectedResourceKeys],
  );

  const isResourceSelected = useCallback(
    (planId: string, resourceId: string) =>
      selectedResourceKeys.includes(treeResourceKey(planId, resourceId)),
    [selectedResourceKeys],
  );

  const selectAllVisible = useCallback(() => {
    if (allVisibleSelected) {
      clearSelection();
      return;
    }
    setSelectedPlanIds(visiblePlans.map((plan) => plan.id));
    setSelectedResourceKeys(visibleResourceEntries.map((entry) => entry.key));
  }, [allVisibleSelected, clearSelection, visiblePlans, visibleResourceEntries]);

  const completePlan = useCallback(
    (planId: string) => {
      appData.completeCollection(planId);
      setSelectedPlanIds((current) => current.filter((id) => id !== planId));
      setSelectedResourceKeys((current) => current.filter((key) => !key.startsWith(`${planId}::`)));
    },
    [appData],
  );

  const restartPlan = useCallback(
    (planId: string) => {
      appData.restartCollection(planId);
      setStatusFilter('learning');
    },
    [appData],
  );

  const removePlan = useCallback(
    (planId: string) => {
      appData.removeCollection(planId);
      setSelectedPlanIds((current) => current.filter((id) => id !== planId));
      setSelectedResourceKeys((current) => current.filter((key) => !key.startsWith(`${planId}::`)));
    },
    [appData],
  );

  const completeResource = useCallback(
    (planId: string, resourceId: string) => {
      appData.completeMembership(planId, resourceId);
      setSelectedResourceKeys((current) =>
        current.filter((key) => key !== treeResourceKey(planId, resourceId)),
      );
    },
    [appData],
  );

  const restartResource = useCallback(
    (planId: string, resourceId: string) => {
      appData.restartMembership(planId, resourceId);
      setStatusFilter('learning');
      setSelectedResourceKeys((current) =>
        current.filter((key) => key !== treeResourceKey(planId, resourceId)),
      );
    },
    [appData],
  );

  const removeResource = useCallback(
    (planId: string, resourceId: string) => {
      appData.removeMembership(planId, resourceId);
      setSelectedResourceKeys((current) =>
        current.filter((key) => key !== treeResourceKey(planId, resourceId)),
      );
    },
    [appData],
  );

  const bulkComplete = useCallback(() => {
    if (selectedPlanIds.length === 0 && selectedResourceKeys.length === 0) {
      return { ok: false as const, message: '请先选择合集或资源' };
    }

    selectedPlanIds.forEach((planId) => appData.completeCollection(planId));
    selectedResourceKeys.forEach((key) => {
      const [planId, resourceId] = key.split('::');
      if (!selectedPlanIds.includes(planId)) {
        appData.completeMembership(planId, resourceId);
      }
    });

    exitSelectMode();
    return { ok: true as const, message: '已完成所选内容' };
  }, [appData, exitSelectMode, selectedPlanIds, selectedResourceKeys]);

  const bulkRemove = useCallback(() => {
    if (selectedPlanIds.length === 0 && selectedResourceKeys.length === 0) {
      return { ok: false as const, message: '请先选择合集或资源' };
    }

    selectedPlanIds.forEach((planId) => appData.removeCollection(planId));
    selectedResourceKeys.forEach((key) => {
      const [planId, resourceId] = key.split('::');
      if (!selectedPlanIds.includes(planId)) {
        appData.removeMembership(planId, resourceId);
      }
    });

    exitSelectMode();
    return { ok: true as const, message: '已移除所选内容' };
  }, [appData, exitSelectMode, selectedPlanIds, selectedResourceKeys]);

  const bulkRestart = useCallback(() => {
    if (selectedPlanIds.length === 0 && selectedResourceKeys.length === 0) {
      return { ok: false as const, message: '请先选择合集或资源' };
    }

    selectedPlanIds.forEach((planId) => appData.restartCollection(planId));
    selectedResourceKeys.forEach((key) => {
      const [planId, resourceId] = key.split('::');
      if (!selectedPlanIds.includes(planId)) {
        appData.restartMembership(planId, resourceId);
      }
    });

    setStatusFilter('learning');
    exitSelectMode();
    return { ok: true as const, message: '已重新学习所选内容' };
  }, [appData, exitSelectMode, selectedPlanIds, selectedResourceKeys]);

  return {
    plans,
    statusFilter,
    setStatusFilter: changeStatusFilter,
    searchQuery,
    setSearchQuery,
    selectMode,
    enterSelectMode,
    exitSelectMode,
    counts,
    visiblePlans,
    visibleTreeResources: (plan: StudyPlan) => visibleTreeResources(plan, query, resourceSortOrder),
    isPlanExpanded,
    togglePlanExpanded,
    expandCollection,
    isPlanSelected,
    isPlanPartial,
    isResourceSelected,
    togglePlanSelect,
    toggleResourceSelect,
    allVisibleSelected,
    selectAllVisible,
    completePlan,
    restartPlan,
    removePlan,
    completeResource,
    restartResource,
    removeResource,
    bulkComplete,
    bulkRemove,
    bulkRestart,
  };
}
