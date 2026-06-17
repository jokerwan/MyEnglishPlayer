import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { TreeChildrenRail, TreeGroupCard } from '@/components/tree/TreeGroupCard';
import { getPlanHeadMeta } from '@/utils/homeLearning';
import type { StudyPlan, StudyPlanResource } from '@/types/studyPlan';

import { HomeContinueButton } from './HomeContinueButton';
import { HomeResourceRow } from './HomeResourceRow';

type HomePlanTreeProps = {
  plan: StudyPlan;
  expanded: boolean;
  emphasized?: boolean;
  resources: StudyPlanResource[];
  highlightedResourceId: string | null;
  onToggleExpanded: () => void;
  onContinuePress: () => void;
  onResourcePress: (resourceId: string) => void;
  onResourceDetailPress: (resourceId: string) => void;
};

export function HomePlanTree({
  plan,
  expanded,
  emphasized = false,
  resources,
  highlightedResourceId,
  onToggleExpanded,
  onContinuePress,
  onResourcePress,
  onResourceDetailPress,
}: HomePlanTreeProps) {
  return (
    <TreeGroupCard>
      <View style={styles.head}>
        <Pressable
          style={({ pressed }) => [styles.headMain, pressed && styles.headMainPressed]}
          onPress={onToggleExpanded}
          accessibilityRole="button"
          accessibilityLabel={plan.title}
        >
          <View style={styles.folderIcon}>
            <FontAwesome name="folder-open" size={16} color="#0f766e" />
          </View>
          <View style={styles.meta}>
            <AppText style={styles.title} numberOfLines={1}>
              {plan.title}
            </AppText>
            <AppText style={styles.metaText} numberOfLines={1}>
              {getPlanHeadMeta(plan)}
            </AppText>
          </View>
        </Pressable>

        <HomeContinueButton
          emphasized={emphasized}
          onPress={onContinuePress}
          accessibilityLabel={`继续播放${plan.title}`}
        />
      </View>

      {expanded && resources.length > 0 ? (
        <TreeChildrenRail>
          {resources.map((resource) => (
            <HomeResourceRow
              key={resource.id}
              resource={resource}
              isCurrent={resource.id === highlightedResourceId}
              onPress={() => onResourcePress(resource.id)}
              onDetailPress={() => onResourceDetailPress(resource.id)}
            />
          ))}
        </TreeChildrenRail>
      ) : null}
    </TreeGroupCard>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headMain: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
  },
  headMainPressed: {
    opacity: 0.72,
  },
  folderIcon: {
    width: 43,
    height: 43,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3fbfa',
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 18,
  },
  metaText: {
    marginTop: 5,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
});
