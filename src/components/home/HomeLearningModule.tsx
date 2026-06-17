import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import type { StudyPlan } from '@/types/studyPlan';

import { HomeLearningSummary } from './HomeLearningSummary';
import { HomeLearningToolbar, HomeTreeSectionHead } from './HomeLearningToolbar';
import { HomeLearningTree } from './HomeLearningTree';

type HomeLearningModuleProps = {
  plans: StudyPlan[];
  planCount: number;
  resourceCount: number;
  weeklyListening: string;
  subtitle: string;
  recentPlanId: string | null;
  expandedPlanIds: Set<string>;
  playerResourceId?: string;
  onExpandAllPress: () => void;
  onManagePress: () => void;
  onToggleExpanded: (planId: string) => void;
  onContinuePress: (plan: StudyPlan) => void;
  onResourcePress: (plan: StudyPlan, resourceId: string) => void;
  onResourceDetailPress: (resourceId: string) => void;
};

export function HomeLearningModule({
  plans,
  planCount,
  resourceCount,
  weeklyListening,
  subtitle,
  recentPlanId,
  expandedPlanIds,
  playerResourceId,
  onExpandAllPress,
  onManagePress,
  onToggleExpanded,
  onContinuePress,
  onResourcePress,
  onResourceDetailPress,
}: HomeLearningModuleProps) {
  return (
    <View style={styles.card}>
      <AppText style={styles.moduleTitle}>我的学习</AppText>

      <HomeLearningSummary
        planCount={planCount}
        resourceCount={resourceCount}
        weeklyListening={weeklyListening}
      />

      <View style={styles.sectionDivider} />

      <HomeLearningToolbar
        subtitle={subtitle}
        onExpandAllPress={onExpandAllPress}
        onManagePress={onManagePress}
      />

      <HomeTreeSectionHead />

      <HomeLearningTree
        plans={plans}
        recentPlanId={recentPlanId}
        expandedPlanIds={expandedPlanIds}
        playerResourceId={playerResourceId}
        onToggleExpanded={onToggleExpanded}
        onContinuePress={onContinuePress}
        onResourcePress={onResourcePress}
        onResourceDetailPress={onResourceDetailPress}
      />
    </View>
  );
}

type HomeLearningEmptyProps = {
  onBrowseResources: () => void;
};

export function HomeLearningEmpty({ onBrowseResources }: HomeLearningEmptyProps) {
  return (
    <View style={styles.emptyCard}>
      <View style={styles.emptyIcon}>
        <FontAwesome name="book" size={22} color={homeTheme.primaryDeep} />
      </View>
      <AppText style={styles.emptyTitle}>还没有在学习的内容</AppText>
      <AppText style={styles.emptyDesc}>
        去资源库挑选素材并加入学习，进度会自动出现在这里
      </AppText>
      <Pressable
        style={({ pressed }) => [styles.emptyButton, pressed && styles.emptyButtonPressed]}
        onPress={onBrowseResources}
      >
        <AppText style={styles.emptyButtonText}>去资源库看看</AppText>
        <FontAwesome name="angle-right" size={14} color="#ffffff" />
      </Pressable>
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
  moduleTitle: {
    color: homeTheme.ink,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: homeTheme.line,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 22,
    borderRadius: homeTheme.cardRadius,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.cardBorder,
    shadowColor: homeTheme.shadow.color,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 3,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: homeTheme.primarySoft,
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  emptyTitle: {
    marginTop: 16,
    color: homeTheme.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyDesc: {
    marginTop: 8,
    color: homeTheme.subtle,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 18,
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: homeTheme.primary,
    shadowColor: homeTheme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 3,
  },
  emptyButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
});
