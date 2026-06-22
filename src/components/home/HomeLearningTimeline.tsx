import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import type { StudyPlan } from '@/types/studyPlan';
import { getDoneResourceCount, getPlanProgress } from '@/utils/learningManager';

import { HomeSectionHeader } from './HomeSectionHeader';

type HomeLearningTimelineProps = {
  plans: StudyPlan[];
  activePlanId: string | null;
  maxItems?: number;
  onMorePress: () => void;
  onPlanPress: (plan: StudyPlan) => void;
};

function formatTimelineMeta(plan: StudyPlan) {
  const progress = getPlanProgress(plan);
  const total = plan.resources.length;
  const done = getDoneResourceCount(plan);
  return `进度 ${progress}% | ${done}/${total} 资源`;
}

function DashedConnector({ height }: { height: number }) {
  const dashCount = Math.max(4, Math.floor(height / 5));

  return (
    <View style={[styles.dashedConnector, { height }]}>
      {Array.from({ length: dashCount }).map((_, index) => (
        <View key={index} style={styles.dash} />
      ))}
    </View>
  );
}

type TimelineRowProps = {
  plan: StudyPlan;
  isActive: boolean;
  isLast: boolean;
  onPress: () => void;
};

function TimelineRow({ plan, isActive, isLast, onPress }: TimelineRowProps) {
  return (
    <View style={styles.rowWrap}>
      <View style={styles.railCol}>
        <View style={[styles.node, isActive ? styles.nodeActive : styles.nodeIdle]}>
          <FontAwesome
            name={isActive ? 'headphones' : 'file-text-o'}
            size={isActive ? 18 : 15}
            color={isActive ? '#ffffff' : homeTheme.primaryDeep}
          />
        </View>
        {!isLast ? <DashedConnector height={28} /> : null}
      </View>

      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={plan.title}
      >
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <AppText style={styles.rowTitle} numberOfLines={1}>
              {plan.title}
            </AppText>
            {isActive ? (
              <View style={styles.badge}>
                <AppText style={styles.badgeText}>进行中</AppText>
              </View>
            ) : null}
          </View>
          <AppText style={styles.rowMeta} numberOfLines={1}>
            {formatTimelineMeta(plan)}
          </AppText>
        </View>
        <FontAwesome name="angle-right" size={18} color="#cbd5e1" />
      </Pressable>
    </View>
  );
}

export function HomeLearningTimeline({
  plans,
  activePlanId,
  maxItems,
  onMorePress,
  onPlanPress,
}: HomeLearningTimelineProps) {
  const visiblePlans = maxItems ? plans.slice(0, maxItems) : plans;

  if (!visiblePlans.length) {
    return (
      <View>
        <HomeSectionHeader title="学习树" onMorePress={onMorePress} />
        <AppText style={styles.emptyText}>加入学习后，进度会显示在这里</AppText>
      </View>
    );
  }

  return (
    <View>
      <HomeSectionHeader title="学习树" onMorePress={onMorePress} />
      <View style={styles.list}>
        {visiblePlans.map((plan, index) => (
          <TimelineRow
            key={plan.id}
            plan={plan}
            isActive={plan.id === activePlanId}
            isLast={index === visiblePlans.length - 1}
            onPress={() => onPlanPress(plan)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 0,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  railCol: {
    width: 40,
    alignItems: 'center',
  },
  node: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeActive: {
    backgroundColor: homeTheme.primary,
    shadowColor: homeTheme.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 3,
  },
  nodeIdle: {
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  dashedConnector: {
    width: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    overflow: 'hidden',
  },
  dash: {
    width: 2,
    height: 4,
    borderRadius: 1,
    backgroundColor: '#5eead4',
    opacity: 0.75,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 40,
    paddingBottom: 20,
  },
  rowPressed: {
    opacity: 0.78,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  rowTitle: {
    color: homeTheme.ink,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  badgeText: {
    color: homeTheme.primaryDeep,
    fontSize: 10,
    fontWeight: '900',
  },
  rowMeta: {
    marginTop: 4,
    color: homeTheme.subtle,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyText: {
    color: homeTheme.subtle,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
});
