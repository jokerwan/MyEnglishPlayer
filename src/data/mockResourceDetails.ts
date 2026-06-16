import { mockResourceItems } from '@/data/mockResources';
import { mockStudyPlans } from '@/data/mockStudyPlans';
import type { ResourceDetail } from '@/types/resourceDetail';
import {
  buildResourceDetailFromLibraryItem,
  buildResourceDetailFromStudyResource,
} from '@/utils/resourceDetail';

const libraryDetails = Object.fromEntries(
  mockResourceItems.map((item) => [item.id, buildResourceDetailFromLibraryItem(item)]),
) as Record<string, ResourceDetail>;

const studyDetails = Object.fromEntries(
  mockStudyPlans.flatMap((plan) =>
    plan.resources.map((resource) => [
      resource.id,
      buildResourceDetailFromStudyResource(resource, plan.title),
    ]),
  ),
) as Record<string, ResourceDetail>;

const mockResourceDetails: Record<string, ResourceDetail> = {
  ...libraryDetails,
  ...studyDetails,
};

export function getResourceDetailById(resourceId: string) {
  return mockResourceDetails[resourceId];
}

export function getAllResourceDetails() {
  return Object.values(mockResourceDetails);
}
