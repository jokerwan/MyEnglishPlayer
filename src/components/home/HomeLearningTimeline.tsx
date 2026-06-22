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
  onMorePress: () => void;
  onPlanPress: (plan: StudyPlan) => void;
};

function formatTimelineMeta(plan: StudyPlan) {
  const progress = getPlanProgress(plan);
  const total = plan.resources.length;
  const done = getDoneResourceCount(plan);
  return `进度 ${progress}% | ${done}/${total} 资源`;
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
            size={isActive ? 18 : 16}
            color={isActive ? '#ffffff' : homeTheme.primaryDeep}
          />
        </View>
        {!isLast ? <View style={styles.connector} /> : null}
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
  onMorePress,
  onPlanPress,
}: HomeLearningTimelineProps) {
  if (!plans.length) {
    return (
      <View style={styles.card}>
        <HomeSectionHeader title="学习树" onMorePress={onMorePress} />
        <AppText style={styles.emptyText}>加入学习后，进度会显示在这里</AppText>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <HomeSectionHeader title="学习树" onMorePress={onMorePress} />
      <View style={styles.list}>
        {plans.map((plan, index) => (
          <TimelineRow
            key={plan.id}
            plan={plan}
            isActive={plan.id === activePlanId}
            isLast={index === plans.length - 1}
            onPress={() => onPlanPress(plan)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: homeTheme.cardRadius,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.cardBorder,
    shadowColor: homeTheme.shadow.color,
    shadowOffset: homeTheme.shadow.offset,
    shadowOpacity: homeTheme.shadow.opacity,
    shadowRadius: homeTheme.shadow.radius,
    elevation: homeTheme.shadow.elevation,
  },
  list: {
    gap: 0,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  railCol: {
    width: 44,
    alignItems: 'center',
  },
  node: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeActive: {
    backgroundColor: homeTheme.primary,
    shadowColor: homeTheme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 14,
    elevation: 3,
  },
  nodeIdle: {
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    marginVertical: 4,
    borderRadius: 999,
    backgroundColor: '#99f6e4',
    opacity: 0.65,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
    paddingBottom: 22,
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
    marginTop: 5,
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
