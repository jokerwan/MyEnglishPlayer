import type { StudyPlan, StudyPlanResource, StudyPlanStatus } from '@/types/studyPlan';

export type LearningSortOrder = 'desc' | 'asc';

export function sortPlans(plans: StudyPlan[], order: LearningSortOrder) {
  return [...plans].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return order === 'desc' ? rightTime - leftTime : leftTime - rightTime;
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

export function sortPlanResources(resources: StudyPlanResource[], order: LearningSortOrder) {
  return [...resources].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return order === 'desc' ? rightTime - leftTime : leftTime - rightTime;
  });
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

export function stripResourceExtension(title: string) {
  return title.replace(/\.(mp4|mp3)$/i, '');
}
