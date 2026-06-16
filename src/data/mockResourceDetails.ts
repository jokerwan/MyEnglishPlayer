import { seedResources } from '@/data/seedLibrary';
import type { ResourceDetail } from '@/types/resourceDetail';
import { buildResourceDetailFromLibraryItem } from '@/utils/resourceDetail';

const mockResourceDetails: Record<string, ResourceDetail> = Object.fromEntries(
  seedResources.map((item) => [item.id, buildResourceDetailFromLibraryItem(item)]),
);

export function getResourceDetailById(resourceId: string) {
  return mockResourceDetails[resourceId];
}

export function getAllResourceDetails() {
  return Object.values(mockResourceDetails);
}

export function registerResourceDetail(detail: ResourceDetail) {
  mockResourceDetails[detail.id] = detail;
}
