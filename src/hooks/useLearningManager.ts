import { useCallback, useMemo, useState } from 'react';

import { mockStudyPlans } from '@/data/mockStudyPlans';
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
  const [plans, setPlans] = useState<StudyPlan[]>(mockStudyPlans);
  const [statusFilter, setStatusFilter] = useState<StudyPlanStatus>('learning');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceSortOrder] = useState<LearningSortOrder>('asc');
  const [collapsedPlanIds, setCollapsedPlanIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [selectedResourceKeys, setSelectedResourceKeys] = useState<string[]>([]);

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
    const allPlansSelected = visiblePlans.every((plan) => selectedPlanIds.includes(plan.id));
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

  const togglePlanExpanded = useCallback((planId: string) => {
    setCollapsedPlanIds((current) =>
      current.includes(planId) ? current.filter((id) => id !== planId) : [...current, planId],
    );
  }, []);

  const isPlanExpanded = useCallback(
    (planId: string) => !collapsedPlanIds.includes(planId),
    [collapsedPlanIds],
  );

  const togglePlanSelect = useCallback((planId: string) => {
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
  }, [plans]);

  const toggleResourceSelect = useCallback((planId: string, resourceId: string) => {
    const key = treeResourceKey(planId, resourceId);
    setSelectedResourceKeys((current) => {
      if (current.includes(key)) {
        setSelectedPlanIds((planIds) => planIds.filter((id) => id !== planId));
        return current.filter((item) => item !== key);
      }
      return [...current, key];
    });
  }, []);

  const isPlanSelected = useCallback(
    (planId: string) => selectedPlanIds.includes(planId),
    [selectedPlanIds],
  );

  const isPlanPartial = useCallback(
    (plan: StudyPlan) => {
      if (selectedPlanIds.includes(plan.id)) {
        return false;
      }
      return plan.resources.some((resource) =>
        selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id)),
      );
    },
    [selectedPlanIds, selectedResourceKeys],
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

  const completePlan = useCallback((planId: string) => {
    setPlans((current) =>
      current.map((plan) =>
        plan.id === planId
          ? updatePlanProgress({
              ...plan,
              status: 'done',
              progress: 100,
              resources: plan.resources.map((resource) => ({
                ...resource,
                done: true,
                progress: 100,
              })),
            })
          : plan,
      ),
    );
    setSelectedPlanIds((current) => current.filter((id) => id !== planId));
    setSelectedResourceKeys((current) =>
      current.filter((key) => !key.startsWith(`${planId}::`)),
    );
  }, []);

  const restartPlan = useCallback((planId: string) => {
    setPlans((current) =>
      current.map((plan) =>
        plan.id === planId
          ? updatePlanProgress({
              ...plan,
              status: 'learning',
              progress: 0,
              meta: '新一轮学习 · 从第 1 个内容开始',
              resources: plan.resources.map((resource) => ({
                ...resource,
                done: false,
                progress: 0,
              })),
            })
          : plan,
      ),
    );
    setStatusFilter('learning');
  }, []);

  const removePlan = useCallback((planId: string) => {
    setPlans((current) => current.filter((plan) => plan.id !== planId));
    setSelectedPlanIds((current) => current.filter((id) => id !== planId));
    setSelectedResourceKeys((current) => current.filter((key) => !key.startsWith(`${planId}::`)));
  }, []);

  const completeResource = useCallback((planId: string, resourceId: string) => {
    setPlans((current) =>
      current.map((plan) => {
        if (plan.id !== planId) {
          return plan;
        }
        const nextPlan = {
          ...plan,
          resources: plan.resources.map((resource) =>
            resource.id === resourceId
              ? { ...resource, done: true, progress: 100 }
              : resource,
          ),
        };
        return updatePlanProgress(nextPlan);
      }),
    );
    setSelectedResourceKeys((current) =>
      current.filter((key) => key !== treeResourceKey(planId, resourceId)),
    );
  }, []);

  const restartResource = useCallback((planId: string, resourceId: string) => {
    setPlans((current) =>
      current.map((plan) => {
        if (plan.id !== planId) {
          return plan;
        }
        const nextPlan = {
          ...plan,
          resources: plan.resources.map((resource) =>
            resource.id === resourceId ? { ...resource, done: false, progress: 0 } : resource,
          ),
        };
        return updatePlanProgress(nextPlan);
      }),
    );
    setStatusFilter('learning');
    setSelectedResourceKeys((current) =>
      current.filter((key) => key !== treeResourceKey(planId, resourceId)),
    );
  }, []);

  const removeResource = useCallback((planId: string, resourceId: string) => {
    setPlans((current) =>
      current
        .map((plan) => {
          if (plan.id !== planId) {
            return plan;
          }
          const nextPlan = {
            ...plan,
            resources: plan.resources.filter((resource) => resource.id !== resourceId),
          };
          return updatePlanProgress(nextPlan);
        })
        .filter((plan) => plan.resources.length > 0),
    );
    setSelectedResourceKeys((current) =>
      current.filter((key) => key !== treeResourceKey(planId, resourceId)),
    );
  }, []);

  const bulkComplete = useCallback(() => {
    if (selectedPlanIds.length === 0 && selectedResourceKeys.length === 0) {
      return { ok: false as const, message: '请先选择合集或资源' };
    }

    setPlans((current) => {
      const touchedPlanIds = new Set<string>(selectedPlanIds);
      selectedResourceKeys.forEach((key) => {
        touchedPlanIds.add(key.split('::')[0]);
      });

      return current.map((plan) => {
        if (selectedPlanIds.includes(plan.id)) {
          return updatePlanProgress({
            ...plan,
            status: 'done',
            progress: 100,
            resources: plan.resources.map((resource) => ({
              ...resource,
              done: true,
              progress: 100,
            })),
          });
        }

        if (!touchedPlanIds.has(plan.id)) {
          return plan;
        }

        const nextPlan = {
          ...plan,
          resources: plan.resources.map((resource) =>
            selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id))
              ? { ...resource, done: true, progress: 100 }
              : resource,
          ),
        };
        return updatePlanProgress(nextPlan);
      });
    });

    exitSelectMode();
    return { ok: true as const, message: '已完成所选内容' };
  }, [exitSelectMode, selectedPlanIds, selectedResourceKeys]);

  const bulkRemove = useCallback(() => {
    if (selectedPlanIds.length === 0 && selectedResourceKeys.length === 0) {
      return { ok: false as const, message: '请先选择合集或资源' };
    }

    setPlans((current) => {
      const next = current
        .filter((plan) => !selectedPlanIds.includes(plan.id))
        .map((plan) => {
          const nextResources = plan.resources.filter(
            (resource) => !selectedResourceKeys.includes(treeResourceKey(plan.id, resource.id)),
          );
          return updatePlanProgress({ ...plan, resources: nextResources });
        })
        .filter((plan) => plan.resources.length > 0);
      return next;
    });

    exitSelectMode();
    return { ok: true as const, message: '已移除所选内容' };
  }, [exitSelectMode, selectedPlanIds, selectedResourceKeys]);

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
  };
}
