import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { LearningDetailHeader } from '@/components/learning/LearningDetailHeader';
import { LearningNavBar } from '@/components/learning/LearningNavBar';
import { LearningResourceCard } from '@/components/learning/LearningResourceCard';
import { colors } from '@/constants/colors';
import { getStudyPlanById } from '@/data/mockStudyPlans';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import {
  getContinueResource,
  type LearningSortOrder,
  sortPlanResources,
  stripResourceExtension,
} from '@/utils/learningManager';

export default function LearningPlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { playPlan } = usePlayer();
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const plan = getStudyPlanById(planId);
  const [sortOrder, setSortOrder] = useState<LearningSortOrder>('asc');

  const resources = useMemo(() => {
    if (!plan) {
      return [];
    }
    return sortPlanResources(plan.resources, sortOrder);
  }, [plan, sortOrder]);

  const continueResource = useMemo(() => {
    if (!plan) {
      return null;
    }
    return getContinueResource(plan.resources);
  }, [plan]);

  const handleContinuePlay = () => {
    if (!plan || !continueResource) {
      showToast('暂无可继续播放的资源');
      return;
    }
    const title = stripResourceExtension(continueResource.title);
    playPlan(title, `来自：${plan.title}`);
    showToast(`继续播放：${title}`);
  };

  const handlePlayResource = (resourceId: string) => {
    const resource = resources.find((item) => item.id === resourceId);
    if (!plan || !resource) {
      return;
    }
    const title = stripResourceExtension(resource.title);
    playPlan(title, `来自：${plan.title}`);
    showToast(`播放：${title}`);
  };

  const handleOpenResource = (resourceId: string) => {
    const resource = resources.find((item) => item.id === resourceId);
    if (!resource) {
      return;
    }
    showToast(`查看资源详情：${stripResourceExtension(resource.title)}`);
  };

  if (!plan) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <LearningNavBar title="资源列表" onBack={() => router.back()} />
        <View style={styles.missing}>
          <AppText variant="sectionDesc">未找到该学习合集</AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#f8fffd', '#f8fafc', '#f1f5f9']}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />

      <LearningNavBar title={plan.title} onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LearningDetailHeader
          resourceCount={resources.length}
          sortOrder={sortOrder}
          onContinuePress={handleContinuePlay}
          onSortPress={() => setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'))}
        />

        <View style={styles.list}>
          {resources.map((resource, index) => (
            <LearningResourceCard
              key={resource.id}
              resource={resource}
              index={index + 1}
              coverVariant={plan.coverVariant}
              onPress={() => handleOpenResource(resource.id)}
              onPlayPress={() => handlePlayResource(resource.id)}
            />
          ))}
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
    gap: 12,
  },
  missing: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  safeBottom: {
    height: 24,
  },
});
