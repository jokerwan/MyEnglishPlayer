import { seedCollections, seedMemberships, seedResources } from '@/data/seedLibrary';
import { buildStudyPlans } from '@/utils/libraryView';
import type { StudyPlan } from '@/types/studyPlan';

export const mockStudyPlans: StudyPlan[] = buildStudyPlans(
  seedCollections,
  seedMemberships,
  seedResources,
);

export function getLearningPlans() {
  return mockStudyPlans.filter((plan) => plan.status === 'learning');
}

export function getStudyPlanById(planId: string) {
  return mockStudyPlans.find((plan) => plan.id === planId);
}

export function getStudyPlanByTitle(title: string) {
  return mockStudyPlans.find((plan) => plan.title === title);
}
