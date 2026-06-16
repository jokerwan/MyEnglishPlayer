import type { CollectionMembership, StudyCollection } from '@/types/library';
import type { ResourceLibraryFolder, ResourceLibraryItem } from '@/types/resource';
import type { StudyPlan, StudyPlanResource } from '@/types/studyPlan';
import { coverCodeFromTitle } from '@/utils/resourceDetail';
import { getResourceMeta } from '@/utils/resourceTree';
import { updatePlanProgress } from '@/utils/learningManager';

export function getMembershipsForResource(memberships: CollectionMembership[], resourceId: string) {
  return memberships.filter((item) => item.resourceId === resourceId);
}

export function getMembershipsForCollection(
  memberships: CollectionMembership[],
  collectionId: string,
) {
  return memberships.filter((item) => item.collectionId === collectionId);
}

export function isResourceInAnyCollection(memberships: CollectionMembership[], resourceId: string) {
  return memberships.some((item) => item.resourceId === resourceId);
}

export function getResourceCollectionCount(memberships: CollectionMembership[], resourceId: string) {
  return new Set(
    memberships.filter((item) => item.resourceId === resourceId).map((item) => item.collectionId),
  ).size;
}

export function getCollectionsContainingResource(
  collections: StudyCollection[],
  memberships: CollectionMembership[],
  resourceId: string,
) {
  const collectionIds = new Set(
    memberships.filter((item) => item.resourceId === resourceId).map((item) => item.collectionId),
  );
  return collections.filter((collection) => collectionIds.has(collection.id));
}

export function findCollectionByTitle(collections: StudyCollection[], title: string) {
  return collections.find((collection) => collection.title.trim() === title.trim());
}

export function getFolderNamesWithoutCollection(
  folderNames: string[],
  collections: StudyCollection[],
) {
  const unique = Array.from(new Set(folderNames.map((name) => name.trim()).filter(Boolean)));
  return unique.filter((name) => !findCollectionByTitle(collections, name));
}

export function buildStudyPlanResource(
  resource: ResourceLibraryItem,
  membership: CollectionMembership,
): StudyPlanResource {
  return {
    id: resource.id,
    title: resource.title,
    meta: getResourceMeta(resource),
    progress: membership.done ? 100 : membership.progress,
    updatedAt: membership.updatedAt,
    done: membership.done,
    cover: coverCodeFromTitle(resource.title),
  };
}

export function buildStudyPlans(
  collections: StudyCollection[],
  memberships: CollectionMembership[],
  resources: ResourceLibraryItem[],
): StudyPlan[] {
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));

  return collections
    .map((collection) => {
      const collectionMemberships = getMembershipsForCollection(memberships, collection.id);
      const planResources = collectionMemberships
        .map((membership) => {
          const resource = resourceMap.get(membership.resourceId);
          if (!resource) {
            return null;
          }
          return buildStudyPlanResource(resource, membership);
        })
        .filter((resource): resource is StudyPlanResource => resource !== null);

      const plan = updatePlanProgress({
        id: collection.id,
        title: collection.title,
        cover: collection.cover,
        coverVariant: collection.coverVariant,
        status: 'learning',
        progress: 0,
        meta: '',
        updatedAt: collection.updatedAt,
        resources: planResources,
      });

      return plan;
    })
    .filter((plan) => plan.resources.length > 0 || plan.id === 'default-learning');
}

export function buildFolderViewModelWithMemberships(
  folder: ResourceLibraryFolder,
  resources: ResourceLibraryItem[],
  memberships: CollectionMembership[],
) {
  const folderResources = resources.filter((item) => item.folderId === folder.id);
  const count = folderResources.length;
  const joinedCount = folderResources.filter((resource) =>
    isResourceInAnyCollection(memberships, resource.id),
  ).length;
  const noneCount = count - joinedCount;

  let studyStatus: 'none' | 'partial' | 'all-added' = 'none';
  let statusLabel = '未加入';
  let metaText = `${count} 个资源`;

  if (count > 0 && joinedCount === count) {
    studyStatus = 'all-added';
    statusLabel = '已加入';
    metaText = `${count} 个资源 · 已全部加入学习`;
  } else if (joinedCount > 0) {
    studyStatus = 'partial';
    statusLabel = '部分加入';
    metaText = `${count} 个资源 · 已加入 ${joinedCount}/${count}`;
  }

  return {
    ...folder,
    resourceCount: count,
    doneCount: 0,
    learningCount: joinedCount,
    noneCount,
    studyStatus,
    statusLabel,
    metaText,
    progressPercent: count > 0 ? Math.round((joinedCount / count) * 100) : 0,
  };
}

export function getCollectionsForRemovePicker(
  collections: StudyCollection[],
  memberships: CollectionMembership[],
  resourceIds: string[],
) {
  const targetIds = new Set(resourceIds);
  const collectionIds = new Set(
    memberships
      .filter((item) => targetIds.has(item.resourceId))
      .map((item) => item.collectionId),
  );
  return collections.filter((collection) => collectionIds.has(collection.id));
}

export function aggregateResourceStudyStatus(
  memberships: CollectionMembership[],
  resourceId: string,
): 'none' | 'learning' | 'done' {
  const resourceMemberships = getMembershipsForResource(memberships, resourceId);
  if (!resourceMemberships.length) {
    return 'none';
  }
  if (resourceMemberships.every((item) => item.done)) {
    return 'done';
  }
  return 'learning';
}

export function getMembershipProgress(
  memberships: CollectionMembership[],
  resourceId: string,
  collectionId?: string,
) {
  if (collectionId) {
    const membership = memberships.find(
      (item) => item.resourceId === resourceId && item.collectionId === collectionId,
    );
    if (!membership) {
      return 0;
    }
    return membership.done ? 100 : membership.progress;
  }

  const resourceMemberships = getMembershipsForResource(memberships, resourceId);
  if (!resourceMemberships.length) {
    return 0;
  }
  const total = resourceMemberships.reduce(
    (sum, item) => sum + (item.done ? 100 : item.progress),
    0,
  );
  return Math.round(total / resourceMemberships.length);
}
