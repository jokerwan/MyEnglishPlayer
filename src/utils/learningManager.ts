import type { StudyPlan, StudyPlanResource, StudyPlanStatus } from '@/types/studyPlan';

export type LearningSortOrder = 'desc' | 'asc';

export function treeResourceKey(planId: string, resourceId: string) {
  return `${planId}::${resourceId}`;
}

export function stripResourceExtension(title: string) {
  return title.replace(/\.(mp4|mp3)$/i, '').trim();
}

export function sortPlans(plans: StudyPlan[], order: LearningSortOrder) {
  return [...plans].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return order === 'desc' ? rightTime - leftTime : leftTime - rightTime;
  });
}

export function sortPlanResources(resources: StudyPlanResource[], order: LearningSortOrder) {
  return [...resources].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return order === 'asc' ? leftTime - rightTime : rightTime - leftTime;
  });
}

export function filterPlansByStatus(plans: StudyPlan[], status: StudyPlanStatus) {
  return plans.filter((plan) => plan.status === status);
}

export function countPlansByStatus(plans: StudyPlan[]) {
  return {
    learning: plans.filter((plan) => plan.status === 'learning').length,
    done: plans.filter((plan) => plan.status === 'done').length,
  };
}

export function getPlanProgress(plan: StudyPlan) {
  if (!plan.resources.length) {
    return plan.progress;
  }
  const total = plan.resources.reduce(
    (sum, resource) => sum + (resource.done ? 100 : resource.progress),
    0,
  );
  return Math.round(total / plan.resources.length);
}

export function getDoneResourceCount(plan: StudyPlan) {
  return plan.resources.filter((resource) => resource.done || resource.progress >= 100).length;
}

export function getPlanStatusMeta(plan: StudyPlan) {
  const total = plan.resources.length;
  const doneCount = getDoneResourceCount(plan);
  const suffix = plan.status === 'done' ? '可复习' : '继续学习';
  return `${total} 个资源 · 已完成 ${doneCount} 个 · ${suffix}`;
}

export function normalizedSearch(query: string) {
  return query.trim().toLowerCase();
}

function textMatches(value: string, query: string) {
  if (!query) {
    return true;
  }
  return value.toLowerCase().includes(query);
}

export function resourceMatchesSearch(resource: StudyPlanResource, query: string) {
  if (!query) {
    return true;
  }
  return (
    textMatches(resource.title, query) ||
    textMatches(stripResourceExtension(resource.title), query) ||
    textMatches(resource.meta, query)
  );
}

export function planMatchesSearch(plan: StudyPlan, query: string) {
  if (!query) {
    return true;
  }
  return (
    textMatches(plan.title, query) ||
    plan.resources.some((resource) => resourceMatchesSearch(resource, query))
  );
}

export function visibleTreeResources(plan: StudyPlan, query: string, sortOrder: LearningSortOrder) {
  const resources = sortPlanResources(plan.resources, sortOrder);
  if (!query || textMatches(plan.title, query)) {
    return resources;
  }
  return resources.filter((resource) => resourceMatchesSearch(resource, query));
}

export function getContinueResource(resources: StudyPlanResource[]) {
  const incomplete = resources.filter((resource) => !resource.done && resource.progress < 100);
  if (incomplete.length === 0) {
    return resources[0] ?? null;
  }

  return [...incomplete].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  )[0];
}

export function updatePlanProgress(plan: StudyPlan): StudyPlan {
  const progress = getPlanProgress(plan);
  const totalCount = plan.resources.length;
  const doneCount = plan.resources.filter((resource) => resource.done).length;

  if (!totalCount) {
    return { ...plan, progress };
  }

  if (doneCount === totalCount) {
    return {
      ...plan,
      status: 'done',
      progress: 100,
      meta: '已完成本轮学习 · 可复习或重新学习',
    };
  }

  return {
    ...plan,
    status: 'learning',
    progress,
    meta: `${totalCount} 个内容 · 已完成 ${doneCount} 个 · 继续本轮学习`,
  };
}
