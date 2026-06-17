import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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
    return null;
  }

  return (
    <View style={styles.list}>
      {visiblePlans.map((plan) => {
        const expanded = expandedPlanIds.has(plan.id);
        const resources = getVisibleHomeResources(plan, searchQuery);
        const highlightedResourceId = getHighlightedResourceId(plan, playerResourceId);

        return (
          <HomePlanTree
            key={plan.id}
            plan={plan}
            expanded={expanded}
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
});
