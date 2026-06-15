import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LearningBatchBar } from '@/components/learning/LearningBatchBar';
import { LearningEmptyState } from '@/components/learning/LearningEmptyState';
import { LearningHint } from '@/components/learning/LearningHint';
import { LearningNavBar } from '@/components/learning/LearningNavBar';
import { LearningPlanSwipeRow } from '@/components/learning/LearningPlanSwipeRow';
import { LearningStatusSegment } from '@/components/learning/LearningStatusSegment';
import { LearningToolbar } from '@/components/learning/LearningToolbar';
import { colors } from '@/constants/colors';
import { useToast } from '@/hooks/useAppContext';
import { useLearningManager } from '@/hooks/useLearningManager';

export default function LearningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const manager = useLearningManager();
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

  const handleComplete = (planId: string, title: string) => {
    manager.completePlan(planId);
    showToast(`已标记「${title}」为完成`);
  };

  const handleCancel = (planId: string, title: string) => {
    manager.cancelPlan(planId);
    setOpenSwipeId((current) => (current === planId ? null : current));
    showToast(`已取消「${title}」`);
  };

  const handleBulkComplete = () => {
    const result = manager.bulkComplete();
    showToast(result.message);
  };

  const handleBulkCancel = () => {
    const result = manager.bulkCancel();
    showToast(result.message);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#f8fffd', '#f8fafc', '#f1f5f9']}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />

      <LearningNavBar onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LearningStatusSegment
          value={manager.statusFilter}
          learningCount={manager.counts.learning}
          doneCount={manager.counts.done}
          onChange={(value) => {
            manager.setStatusFilter(value);
            setOpenSwipeId(null);
          }}
        />

        <LearningHint />

        <LearningToolbar
          sortOrder={manager.sortOrder}
          selectMode={manager.selectMode}
          onSortPress={manager.toggleSortOrder}
          onSelectModePress={manager.toggleSelectMode}
        />

        {manager.selectMode ? (
          <LearningBatchBar
            selectedCount={manager.selectedCount}
            allSelected={manager.allVisibleSelected}
            onSelectAll={manager.selectAllVisible}
            onComplete={handleBulkComplete}
            onCancel={handleBulkCancel}
          />
        ) : null}

        <View style={styles.list}>
          {manager.visiblePlans.length > 0 ? (
            manager.visiblePlans.map((plan) => (
              <LearningPlanSwipeRow
                key={plan.id}
                plan={plan}
                selectMode={manager.selectMode}
                selected={manager.selectedIds.includes(plan.id)}
                swipeEnabled={!manager.selectMode}
                isOpen={openSwipeId === plan.id}
                onOpenChange={(planId) => setOpenSwipeId(planId)}
                onPress={() => router.push(`/learning/${plan.id}`)}
                onCompletePress={() => handleComplete(plan.id, plan.title)}
                onCancelPress={() => handleCancel(plan.id, plan.title)}
                onSelectPress={() => manager.toggleSelect(plan.id)}
              />
            ))
          ) : (
            <LearningEmptyState />
          )}
        </View>

        <View style={styles.safeBottom} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  list: {
    gap: 13,
    marginTop: 14,
  },
  safeBottom: {
    height: 24,
  },
});
