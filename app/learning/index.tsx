import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LearningBatchBar } from '@/components/learning/LearningBatchBar';
import { LearningEmptyState } from '@/components/learning/LearningEmptyState';
import { LearningNavBar } from '@/components/learning/LearningNavBar';
import { LearningSearchBar } from '@/components/learning/LearningSearchBar';
import { LearningStatusSegment } from '@/components/learning/LearningStatusSegment';
import { LearningTreePlanRow } from '@/components/learning/LearningTreePlanRow';
import { colors } from '@/constants/colors';
import { useToast } from '@/hooks/useAppContext';
import { useLearningManager } from '@/hooks/useLearningManager';
import { stripResourceExtension } from '@/utils/learningManager';

export default function LearningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const manager = useLearningManager();

  const handleCompletePlan = (planId: string, title: string) => {
    manager.completePlan(planId);
    showToast(`已完成：${title}`);
  };

  const handleRestartPlan = (planId: string, title: string) => {
    manager.restartPlan(planId);
    showToast(`已重新学习：${title}`);
  };

  const handleRemovePlan = (planId: string, title: string, status: 'learning' | 'done') => {
    manager.removePlan(planId);
    showToast(status === 'done' ? `已移除：${title}` : `已取消学习：${title}`);
  };

  const handleCompleteResource = (planId: string, resourceId: string) => {
    const plan = manager.plans.find((item) => item.id === planId);
    const resource = plan?.resources.find((item) => item.id === resourceId);
    manager.completeResource(planId, resourceId);
    if (resource) {
      showToast(`已完成：${stripResourceExtension(resource.title)}`);
    }
  };

  const handleRestartResource = (planId: string, resourceId: string) => {
    const plan = manager.plans.find((item) => item.id === planId);
    const resource = plan?.resources.find((item) => item.id === resourceId);
    manager.restartResource(planId, resourceId);
    if (resource) {
      showToast(`已重新学习：${stripResourceExtension(resource.title)}`);
    }
  };

  const handleRemoveResource = (planId: string, resourceId: string) => {
    const plan = manager.plans.find((item) => item.id === planId);
    const resource = plan?.resources.find((item) => item.id === resourceId);
    manager.removeResource(planId, resourceId);
    if (resource) {
      showToast(`已移除：${stripResourceExtension(resource.title)}`);
    }
  };

  const handleBulkPrimary = () => {
    const result =
      manager.statusFilter === 'done' ? manager.bulkRestart() : manager.bulkComplete();
    showToast(result.message);
  };

  const handleBulkRemove = () => {
    const result = manager.bulkRemove();
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
        keyboardShouldPersistTaps="handled"
      >
        <LearningStatusSegment
          value={manager.statusFilter}
          learningCount={manager.counts.learning}
          doneCount={manager.counts.done}
          onChange={manager.setStatusFilter}
        />

        <LearningSearchBar
          value={manager.searchQuery}
          onChangeText={manager.setSearchQuery}
          onClear={() => manager.setSearchQuery('')}
        />

        {manager.selectMode ? (
          <LearningBatchBar
            allSelected={manager.allVisibleSelected}
            primaryLabel={manager.statusFilter === 'done' ? '重新学习' : '完成学习'}
            primaryIcon={manager.statusFilter === 'done' ? 'refresh' : 'check'}
            onSelectAll={manager.selectAllVisible}
            onPrimary={handleBulkPrimary}
            onRemove={handleBulkRemove}
          />
        ) : null}

        <View style={styles.list}>
          {manager.visiblePlans.length > 0 ? (
            manager.visiblePlans.map((plan) => (
              <LearningTreePlanRow
                key={plan.id}
                plan={plan}
                expanded={manager.isPlanExpanded(plan.id)}
                selectMode={manager.selectMode}
                selected={manager.isPlanSelected(plan)}
                partial={manager.isPlanPartial(plan)}
                resources={manager.visibleTreeResources(plan)}
                isResourceSelected={(resourceId) => manager.isResourceSelected(plan.id, resourceId)}
                onToggleExpanded={() => manager.togglePlanExpanded(plan.id)}
                onLongPress={manager.enterSelectMode}
                onSelect={() => manager.togglePlanSelect(plan.id)}
                onComplete={() => handleCompletePlan(plan.id, plan.title)}
                onRestart={() => handleRestartPlan(plan.id, plan.title)}
                onRemove={() => handleRemovePlan(plan.id, plan.title, plan.status)}
                onResourceLongPress={() => manager.enterSelectMode()}
                onResourcePress={() => showToast(`管理资源：${plan.title}`)}
                onResourceSelect={(resourceId) => manager.toggleResourceSelect(plan.id, resourceId)}
                onResourceComplete={(resourceId) => handleCompleteResource(plan.id, resourceId)}
                onResourceRestart={(resourceId) => handleRestartResource(plan.id, resourceId)}
                onResourceRemove={(resourceId) => handleRemoveResource(plan.id, resourceId)}
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
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  list: {
    gap: 12,
    marginTop: 14,
  },
  safeBottom: {
    height: 120,
  },
});
