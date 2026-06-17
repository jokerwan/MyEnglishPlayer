import type { StudyPlan, StudyPlanResource } from '@/types/studyPlan';

import {
  getContinueResource,
  getPlanProgress,
  normalizedSearch,
  planMatchesSearch,
  sortPlans,
  stripResourceExtension,
  visibleTreeResources,
  type LearningSortOrder,
} from './learningManager';

export function findPlanForResource(plans: StudyPlan[], resourceId: string) {
  return plans.find((plan) => plan.resources.some((resource) => resource.id === resourceId)) ?? null;
}

export function getRecentLearningPlan(plans: StudyPlan[], playerResourceId?: string) {
  if (!plans.length) {
    return null;
  }

  if (playerResourceId) {
    const matched = findPlanForResource(plans, playerResourceId);
    if (matched) {
      return matched;
    }
  }

  return sortPlans(plans, 'desc')[0] ?? null;
}

export function getHighlightedResourceId(plan: StudyPlan, playerResourceId?: string) {
  if (playerResourceId && plan.resources.some((resource) => resource.id === playerResourceId)) {
    return playerResourceId;
  }

  return getContinueResource(plan.resources)?.id ?? null;
}

export function formatResourceResumeMeta(resource: StudyPlanResource) {
  const progress = resource.done ? 100 : resource.progress;
  const durationPart = resource.meta.split('·')[0]?.trim() ?? '';
  if (resource.done) {
    return `${progress}% · 已完成`;
  }
  return `${progress}% · 上次 ${durationPart || '继续学习'}`;
}

export function formatHomeResumeSubtitle(plan: StudyPlan | null, resource: StudyPlanResource | null) {
  if (!plan || !resource) {
    return '正在学习的内容会显示在这里';
  }

  const shortTitle = stripResourceExtension(resource.title);
  const label = shortTitle.length > 14 ? `${shortTitle.slice(0, 14)}…` : shortTitle;
  return `上次停在 ${plan.title} · ${label} · ${resource.done ? 100 : resource.progress}%`;
}

export function getPlanHeadMeta(plan: StudyPlan) {
  const progress = getPlanProgress(plan);
  return `${plan.resources.length} 个资源 · 进度 ${progress}%`;
}

export function getHomeLearningCounts(plans: StudyPlan[]) {
  const resourceCount = plans.reduce((sum, plan) => sum + plan.resources.length, 0);
  return {
    planCount: plans.length,
    resourceCount,
  };
}

export function filterHomePlans(plans: StudyPlan[], query: string, sortOrder: LearningSortOrder = 'desc') {
  const normalized = normalizedSearch(query);
  const sorted = sortPlans(plans, sortOrder);
  if (!normalized) {
    return sorted;
  }
  return sorted.filter((plan) => planMatchesSearch(plan, normalized));
}

export function getVisibleHomeResources(
  plan: StudyPlan,
  query: string,
  sortOrder: LearningSortOrder = 'asc',
) {
  return visibleTreeResources(plan, normalizedSearch(query), sortOrder);
}
