import { useCallback, useMemo, useState } from 'react';

import { mockStudyPlans } from '@/data/mockStudyPlans';
import type { StudyPlan, StudyPlanStatus } from '@/types/studyPlan';
import {
  countPlansByStatus,
  filterPlansByStatus,
  type LearningSortOrder,
  sortPlans,
} from '@/utils/learningManager';

export function useLearningManager() {
  const [plans, setPlans] = useState<StudyPlan[]>(mockStudyPlans);
  const [statusFilter, setStatusFilter] = useState<StudyPlanStatus>('learning');
  const [sortOrder, setSortOrder] = useState<LearningSortOrder>('desc');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const counts = useMemo(() => countPlansByStatus(plans), [plans]);

  const visiblePlans = useMemo(() => {
    const filtered = filterPlansByStatus(plans, statusFilter);
    return sortPlans(filtered, sortOrder);
  }, [plans, sortOrder, statusFilter]);

  const selectedCount = selectedIds.length;
  const allVisibleSelected =
    visiblePlans.length > 0 && visiblePlans.every((plan) => selectedIds.includes(plan.id));

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const toggleSelectMode = useCallback(() => {
    setSelectMode((current) => {
      if (current) {
        setSelectedIds([]);
      }
      return !current;
    });
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((current) => (current === 'desc' ? 'asc' : 'desc'));
  }, []);

  const toggleSelect = useCallback((planId: string) => {
    setSelectedIds((current) =>
      current.includes(planId) ? current.filter((id) => id !== planId) : [...current, planId],
    );
  }, []);

  const selectAllVisible = useCallback(() => {
    if (allVisibleSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(visiblePlans.map((plan) => plan.id));
  }, [allVisibleSelected, visiblePlans]);

  const completePlan = useCallback((planId: string) => {
    setPlans((current) =>
      current.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: 'done',
              progress: 100,
              resources: plan.resources.map((resource) => ({
                ...resource,
                done: true,
                progress: 100,
              })),
            }
          : plan,
      ),
    );
    setSelectedIds((current) => current.filter((id) => id !== planId));
  }, []);

  const cancelPlan = useCallback((planId: string) => {
    setPlans((current) => current.filter((plan) => plan.id !== planId));
    setSelectedIds((current) => current.filter((id) => id !== planId));
  }, []);

  const bulkComplete = useCallback(() => {
    if (selectedIds.length === 0) {
      return { ok: false as const, message: '请先选择合集' };
    }

    setPlans((current) =>
      current.map((plan) =>
        selectedIds.includes(plan.id)
          ? {
              ...plan,
              status: 'done',
              progress: 100,
              resources: plan.resources.map((resource) => ({
                ...resource,
                done: true,
                progress: 100,
              })),
            }
          : plan,
      ),
    );
    const count = selectedIds.length;
    setSelectedIds([]);
    setSelectMode(false);
    return { ok: true as const, message: `已标记 ${count} 个合集为完成` };
  }, [selectedIds]);

  const bulkCancel = useCallback(() => {
    if (selectedIds.length === 0) {
      return { ok: false as const, message: '请先选择合集' };
    }

    setPlans((current) => current.filter((plan) => !selectedIds.includes(plan.id)));
    const count = selectedIds.length;
    setSelectedIds([]);
    setSelectMode(false);
    return { ok: true as const, message: `已取消 ${count} 个合集` };
  }, [selectedIds]);

  return {
    plans,
    statusFilter,
    setStatusFilter,
    sortOrder,
    toggleSortOrder,
    selectMode,
    toggleSelectMode,
    selectedIds,
    selectedCount,
    allVisibleSelected,
    counts,
    visiblePlans,
    toggleSelect,
    selectAllVisible,
    clearSelection,
    completePlan,
    cancelPlan,
    bulkComplete,
    bulkCancel,
  };
}
