import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import {
  getHighlightedResourceId,
  getRecentLearningPlan,
  getVisibleHomeResources,
} from '@/utils/homeLearning';
import { getContinueResource, stripResourceExtension } from '@/utils/learningManager';
import type { StudyPlan } from '@/types/studyPlan';

import { HomePlanTree } from './HomePlanTree';

type HomeLearningTreeProps = {
  plans: StudyPlan[];
  recentPlanId: string | null;
  expandedPlanIds: Set<string>;
  playerResourceId?: string;
  searchQuery?: string;
  embedded?: boolean;
  onToggleExpanded: (planId: string) => void;
  onContinuePress: (plan: StudyPlan) => void;
  onResourcePress: (plan: StudyPlan, resourceId: string) => void;
  onResourceDetailPress: (resourceId: string) => void;
};

export function HomeLearningTree({
  plans,
  recentPlanId,
  expandedPlanIds,
  playerResourceId,
  searchQuery = '',
  embedded = false,
  onToggleExpanded,
  onContinuePress,
  onResourcePress,
  onResourceDetailPress,
}: HomeLearningTreeProps) {
  const visiblePlans = useMemo(() => {
    if (!searchQuery.trim()) {
      return plans;
    }
    const query = searchQuery.trim().toLowerCase();
    return plans.filter(
      (plan) =>
        plan.title.toLowerCase().includes(query) ||
        plan.resources.some((resource) =>
          stripResourceExtension(resource.title).toLowerCase().includes(query),
        ),
    );
  }, [plans, searchQuery]);

  if (!visiblePlans.length) {
    if (embedded) {
      return null;
    }

    return (
      <View style={styles.empty}>
        <AppText style={styles.emptyTitle}>还没有正在学习的内容</AppText>
        <AppText style={styles.emptyDesc}>去资源库挑选素材，加入学习后会显示在这里</AppText>
      </View>
    );
  }

  return (
    <View style={[styles.list, embedded && styles.listEmbedded]}>
      {visiblePlans.map((plan) => {
        const expanded = expandedPlanIds.has(plan.id);
        const resources = getVisibleHomeResources(plan, searchQuery);
        const highlightedResourceId = getHighlightedResourceId(plan, playerResourceId);

        return (
          <HomePlanTree
            key={plan.id}
            plan={plan}
            expanded={expanded}
            embedded={embedded}
            emphasized={plan.id === recentPlanId}
            resources={expanded ? resources : []}
            highlightedResourceId={highlightedResourceId}
            onToggleExpanded={() => onToggleExpanded(plan.id)}
            onContinuePress={() => onContinuePress(plan)}
            onResourcePress={(resourceId) => onResourcePress(plan, resourceId)}
            onResourceDetailPress={onResourceDetailPress}
          />
        );
      })}
    </View>
  );
}

export function useHomeLearningDefaults(plans: StudyPlan[], playerResourceId?: string) {
  return useMemo(() => {
    const recentPlan = getRecentLearningPlan(plans, playerResourceId);
    const recentPlanId = recentPlan?.id ?? null;
    const recentResource = recentPlan
      ? getContinueResource(recentPlan.resources) ??
        (playerResourceId
          ? recentPlan.resources.find((resource) => resource.id === playerResourceId) ?? null
          : null)
      : null;

    return {
      recentPlan,
      recentPlanId,
      recentResource,
      defaultExpandedIds: recentPlanId ? new Set([recentPlanId]) : new Set<string>(),
    };
  }, [plans, playerResourceId]);
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  listEmbedded: {
    gap: 10,
  },
  empty: {
    paddingVertical: 28,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6edf3',
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
  },
  emptyDesc: {
    marginTop: 8,
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
