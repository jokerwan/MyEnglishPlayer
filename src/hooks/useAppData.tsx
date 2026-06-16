import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { DEFAULT_COLLECTION_ID, DEFAULT_COLLECTION_TITLE } from '@/constants/library';
import {
  seedCollections,
  seedFolders,
  seedMemberships,
  seedResources,
} from '@/data/seedLibrary';
import type {
  CollectionMembership,
  CollectionPickerRequest,
  StudyCollection,
  StudyCollectionSource,
  UploadResourcePayload,
} from '@/types/library';
import type { ResourceLibraryFolder, ResourceLibraryItem } from '@/types/resource';
import type { StudyPlan } from '@/types/studyPlan';
import {
  aggregateResourceStudyStatus,
  buildStudyPlans,
  findCollectionByTitle,
  getMembershipProgress,
} from '@/utils/libraryView';
import { coverCodeFromTitle } from '@/utils/resourceDetail';
import { updatePlanProgress } from '@/utils/learningManager';

type AppDataContextValue = {
  folders: ResourceLibraryFolder[];
  resources: ResourceLibraryItem[];
  collections: StudyCollection[];
  memberships: CollectionMembership[];
  studyPlans: StudyPlan[];
  highlightResourceId: string | null;
  pickerRequest: CollectionPickerRequest | null;
  addFolder: (name: string) => { ok: boolean; message: string; folderName?: string };
  uploadResource: (payload: UploadResourcePayload) => ResourceLibraryItem;
  openCollectionPicker: (request: CollectionPickerRequest) => void;
  closeCollectionPicker: () => void;
  addResourcesToCollection: (
    collectionId: string,
    resourceIds: string[],
  ) => { ok: boolean; message: string };
  removeResourcesFromCollection: (
    collectionId: string,
    resourceIds: string[],
  ) => { ok: boolean; message: string };
  removeResourcesFromAllCollections: (resourceIds: string[]) => { ok: boolean; message: string };
  createCollectionAndAddResources: (
    title: string,
    resourceIds: string[],
    source?: StudyCollectionSource,
    linkedFolderName?: string,
  ) => { ok: boolean; message: string; collectionId?: string };
  quickCreateFolderCollections: (
    folderName: string,
    resourceIds: string[],
  ) => { ok: boolean; message: string; collectionId?: string };
  setHighlightResourceId: (resourceId: string | null) => void;
  getResourceCollectionCount: (resourceId: string) => number;
  isResourceInAnyCollection: (resourceId: string) => boolean;
  getResourceStudyStatus: (resourceId: string) => 'none' | 'learning' | 'done';
  getResourceProgress: (resourceId: string, collectionId?: string) => number;
  updateMembershipProgress: (
    collectionId: string,
    resourceId: string,
    patch: Partial<Pick<CollectionMembership, 'progress' | 'done'>>,
  ) => void;
  completeCollection: (collectionId: string) => void;
  restartCollection: (collectionId: string) => void;
  removeCollection: (collectionId: string) => void;
  completeMembership: (collectionId: string, resourceId: string) => void;
  restartMembership: (collectionId: string, resourceId: string) => void;
  removeMembership: (collectionId: string, resourceId: string) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

const coverVariants: StudyCollection['coverVariant'][] = ['indigo', 'green', 'orange'];

function nowIso() {
  return new Date().toISOString();
}

function pickCoverVariant(index: number): StudyCollection['coverVariant'] {
  return coverVariants[index % coverVariants.length];
}

function syncCollectionTimestamp(
  collections: StudyCollection[],
  collectionId: string,
  memberships: CollectionMembership[],
) {
  const latest = memberships
    .filter((item) => item.collectionId === collectionId)
    .map((item) => item.updatedAt)
    .sort()
    .at(-1);
  return collections.map((collection) =>
    collection.id === collectionId
      ? { ...collection, updatedAt: latest ?? nowIso() }
      : collection,
  );
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<ResourceLibraryFolder[]>(seedFolders);
  const [resources, setResources] = useState<ResourceLibraryItem[]>(seedResources);
  const [collections, setCollections] = useState<StudyCollection[]>(seedCollections);
  const [memberships, setMemberships] = useState<CollectionMembership[]>(seedMemberships);
  const [highlightResourceId, setHighlightResourceId] = useState<string | null>(null);
  const [pickerRequest, setPickerRequest] = useState<CollectionPickerRequest | null>(null);

  const studyPlans = useMemo(
    () => buildStudyPlans(collections, memberships, resources).filter((plan) => plan.resources.length > 0),
    [collections, memberships, resources],
  );

  const addFolder = useCallback((name: string) => {
    const folderName = name.trim() || '新建文件夹';
    if (folders.some((folder) => folder.name === folderName)) {
      return { ok: false, message: '文件夹已存在' };
    }
    const newFolder: ResourceLibraryFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      icon: 'folder-o',
      gradient: ['#14b8a6', '#99f6e4'],
      isUserCreated: true,
    };
    setFolders((current) => [...current, newFolder]);
    return { ok: true, message: `已新建文件夹：${folderName}`, folderName };
  }, [folders]);

  const uploadResource = useCallback((payload: UploadResourcePayload) => {
    const resource: ResourceLibraryItem = {
      id: `resource-${Date.now()}`,
      title: payload.title,
      folderId: payload.folderId,
      folder: payload.folderName,
      type: payload.type,
      duration: payload.duration ?? '08:00',
      level: payload.level,
      hasSubtitle: payload.hasSubtitle,
      tag: payload.tag,
      searchTitle: `${payload.title} ${payload.tag} ${payload.folderName}`.toLowerCase(),
    };
    setResources((current) => [resource, ...current]);
    setHighlightResourceId(resource.id);
    return resource;
  }, []);

  const openCollectionPicker = useCallback((request: CollectionPickerRequest) => {
    setPickerRequest(request);
  }, []);

  const closeCollectionPicker = useCallback(() => {
    setPickerRequest(null);
  }, []);

  const addResourcesToCollection = useCallback(
    (collectionId: string, resourceIds: string[]) => {
      if (!resourceIds.length) {
        return { ok: false, message: '请先选择资源' };
      }

      const timestamp = nowIso();
      setMemberships((current) => {
        const next = [...current];
        resourceIds.forEach((resourceId) => {
          const exists = next.some(
            (item) => item.collectionId === collectionId && item.resourceId === resourceId,
          );
          if (!exists) {
            next.push({
              collectionId,
              resourceId,
              progress: 0,
              done: false,
              updatedAt: timestamp,
            });
          }
        });
        return next;
      });
      setCollections((current) => syncCollectionTimestamp(current, collectionId, memberships));
      const collection = collections.find((item) => item.id === collectionId);
      return {
        ok: true,
        message: `已加入「${collection?.title ?? '学习合集'}」`,
      };
    },
    [collections, memberships],
  );

  const removeResourcesFromCollection = useCallback(
    (collectionId: string, resourceIds: string[]) => {
      if (!resourceIds.length) {
        return { ok: false, message: '请先选择资源' };
      }
      const targetIds = new Set(resourceIds);
      setMemberships((current) =>
        current.filter(
          (item) => !(item.collectionId === collectionId && targetIds.has(item.resourceId)),
        ),
      );
      const collection = collections.find((item) => item.id === collectionId);
      return {
        ok: true,
        message: `已从「${collection?.title ?? '学习合集'}」移除`,
      };
    },
    [collections],
  );

  const removeResourcesFromAllCollections = useCallback((resourceIds: string[]) => {
    if (!resourceIds.length) {
      return { ok: false, message: '请先选择资源' };
    }
    const targetIds = new Set(resourceIds);
    setMemberships((current) => current.filter((item) => !targetIds.has(item.resourceId)));
    return { ok: true, message: '已从全部学习合集移除' };
  }, []);

  const createCollectionAndAddResources = useCallback(
    (
      title: string,
      resourceIds: string[],
      source: StudyCollectionSource = 'manual',
      linkedFolderName?: string,
    ) => {
      const collectionTitle = title.trim() || DEFAULT_COLLECTION_TITLE;
      const existing = findCollectionByTitle(collections, collectionTitle);
      if (existing) {
        return addResourcesToCollection(existing.id, resourceIds);
      }

      const collectionId = `collection-${Date.now()}`;
      const newCollection: StudyCollection = {
        id: collectionId,
        title: collectionTitle,
        cover: coverCodeFromTitle(collectionTitle).slice(0, 4) || '学习',
        coverVariant: pickCoverVariant(collections.length),
        source,
        updatedAt: nowIso(),
        linkedFolderName,
      };
      setCollections((current) => [...current, newCollection]);
      const result = addResourcesToCollection(collectionId, resourceIds);
      return {
        ...result,
        message: `已创建「${collectionTitle}」并加入学习`,
        collectionId,
      };
    },
    [addResourcesToCollection, collections],
  );

  const quickCreateFolderCollections = useCallback(
    (folderName: string, resourceIds: string[]) => {
      return createCollectionAndAddResources(folderName, resourceIds, 'manual', folderName);
    },
    [createCollectionAndAddResources],
  );

  const getResourceCollectionCount = useCallback(
    (resourceId: string) =>
      new Set(
        memberships.filter((item) => item.resourceId === resourceId).map((item) => item.collectionId),
      ).size,
    [memberships],
  );

  const isResourceInAnyCollection = useCallback(
    (resourceId: string) => memberships.some((item) => item.resourceId === resourceId),
    [memberships],
  );

  const getResourceStudyStatus = useCallback(
    (resourceId: string) => aggregateResourceStudyStatus(memberships, resourceId),
    [memberships],
  );

  const getResourceProgress = useCallback(
    (resourceId: string, collectionId?: string) =>
      getMembershipProgress(memberships, resourceId, collectionId),
    [memberships],
  );

  const updateMembershipProgress = useCallback(
    (
      collectionId: string,
      resourceId: string,
      patch: Partial<Pick<CollectionMembership, 'progress' | 'done'>>,
    ) => {
      setMemberships((current) =>
        current.map((item) =>
          item.collectionId === collectionId && item.resourceId === resourceId
            ? { ...item, ...patch, updatedAt: nowIso() }
            : item,
        ),
      );
    },
    [],
  );

  const applyCollectionMutation = useCallback(
    (collectionId: string, mutate: (plan: StudyPlan) => StudyPlan) => {
      const plan = studyPlans.find((item) => item.id === collectionId);
      if (!plan) {
        return;
      }
      const nextPlan = mutate(plan);
      const timestamp = nowIso();
      setMemberships((current) => {
        const others = current.filter((item) => item.collectionId !== collectionId);
        const nextMemberships = nextPlan.resources.map((resource) => {
          const previous = current.find(
            (item) => item.collectionId === collectionId && item.resourceId === resource.id,
          );
          return {
            collectionId,
            resourceId: resource.id,
            progress: resource.done ? 100 : resource.progress,
            done: resource.done,
            updatedAt: timestamp,
          };
        });
        return [...others, ...nextMemberships];
      });
      setCollections((current) =>
        current.map((collection) =>
          collection.id === collectionId ? { ...collection, updatedAt: timestamp } : collection,
        ),
      );
    },
    [studyPlans],
  );

  const completeCollection = useCallback(
    (collectionId: string) => {
      applyCollectionMutation(collectionId, (plan) =>
        updatePlanProgress({
          ...plan,
          status: 'done',
          progress: 100,
          resources: plan.resources.map((resource) => ({
            ...resource,
            done: true,
            progress: 100,
          })),
        }),
      );
    },
    [applyCollectionMutation],
  );

  const restartCollection = useCallback(
    (collectionId: string) => {
      applyCollectionMutation(collectionId, (plan) =>
        updatePlanProgress({
          ...plan,
          status: 'learning',
          progress: 0,
          resources: plan.resources.map((resource) => ({
            ...resource,
            done: false,
            progress: 0,
          })),
        }),
      );
    },
    [applyCollectionMutation],
  );

  const removeCollection = useCallback((collectionId: string) => {
    if (collectionId === DEFAULT_COLLECTION_ID) {
      return;
    }
    setCollections((current) => current.filter((collection) => collection.id !== collectionId));
    setMemberships((current) => current.filter((item) => item.collectionId !== collectionId));
  }, []);

  const completeMembership = useCallback(
    (collectionId: string, resourceId: string) => {
      applyCollectionMutation(collectionId, (plan) => {
        const nextPlan = {
          ...plan,
          resources: plan.resources.map((resource) =>
            resource.id === resourceId
              ? { ...resource, done: true, progress: 100 }
              : resource,
          ),
        };
        return updatePlanProgress(nextPlan);
      });
    },
    [applyCollectionMutation],
  );

  const restartMembership = useCallback(
    (collectionId: string, resourceId: string) => {
      applyCollectionMutation(collectionId, (plan) => {
        const nextPlan = {
          ...plan,
          resources: plan.resources.map((resource) =>
            resource.id === resourceId ? { ...resource, done: false, progress: 0 } : resource,
          ),
        };
        return updatePlanProgress(nextPlan);
      });
    },
    [applyCollectionMutation],
  );

  const removeMembership = useCallback((collectionId: string, resourceId: string) => {
    setMemberships((current) =>
      current.filter(
        (item) => !(item.collectionId === collectionId && item.resourceId === resourceId),
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      folders,
      resources,
      collections,
      memberships,
      studyPlans,
      highlightResourceId,
      pickerRequest,
      addFolder,
      uploadResource,
      openCollectionPicker,
      closeCollectionPicker,
      addResourcesToCollection,
      removeResourcesFromCollection,
      removeResourcesFromAllCollections,
      createCollectionAndAddResources,
      quickCreateFolderCollections,
      setHighlightResourceId,
      getResourceCollectionCount,
      isResourceInAnyCollection,
      getResourceStudyStatus,
      getResourceProgress,
      updateMembershipProgress,
      completeCollection,
      restartCollection,
      removeCollection,
      completeMembership,
      restartMembership,
      removeMembership,
    }),
    [
      folders,
      resources,
      collections,
      memberships,
      studyPlans,
      highlightResourceId,
      pickerRequest,
      addFolder,
      uploadResource,
      openCollectionPicker,
      closeCollectionPicker,
      addResourcesToCollection,
      removeResourcesFromCollection,
      removeResourcesFromAllCollections,
      createCollectionAndAddResources,
      quickCreateFolderCollections,
      getResourceCollectionCount,
      isResourceInAnyCollection,
      getResourceStudyStatus,
      getResourceProgress,
      updateMembershipProgress,
      completeCollection,
      restartCollection,
      removeCollection,
      completeMembership,
      restartMembership,
      removeMembership,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
