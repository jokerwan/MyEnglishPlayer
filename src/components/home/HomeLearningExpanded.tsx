import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { layout } from '@/constants/layout';
import type { StudyPlan } from '@/types/studyPlan';

import { HomeLearningTree } from './HomeLearningTree';
import { HomeSearchBar } from './HomeSearchBar';
import { HomeTreeSectionHead } from './HomeLearningToolbar';

type HomeLearningExpandedProps = {
  visible: boolean;
  plans: StudyPlan[];
  recentPlanId: string | null;
  expandedPlanIds: Set<string>;
  playerResourceId?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onClose: () => void;
  onManagePress: () => void;
  onToggleExpanded: (planId: string) => void;
  onContinuePress: (plan: StudyPlan) => void;
  onResourcePress: (plan: StudyPlan, resourceId: string) => void;
  onResourceDetailPress: (resourceId: string) => void;
};

export function HomeLearningExpanded({
  visible,
  plans,
  recentPlanId,
  expandedPlanIds,
  playerResourceId,
  searchQuery,
  onSearchChange,
  onSearchClear,
  onClose,
  onManagePress,
  onToggleExpanded,
  onContinuePress,
  onResourcePress,
  onResourceDetailPress,
}: HomeLearningExpandedProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <LinearGradient colors={[...homeTheme.bgGradient]} style={StyleSheet.absoluteFill} />

        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="收起我的学习">
            <FontAwesome name="chevron-down" size={16} color="#64748b" />
          </Pressable>
          <View style={styles.headerCopy}>
            <AppText variant="sectionTitle">我的学习</AppText>
            <AppText variant="sectionDesc">搜索合集或资源，快速定位内容</AppText>
          </View>
          <Pressable style={styles.manageButton} onPress={onManagePress}>
            <AppText style={styles.manageText}>管理</AppText>
          </Pressable>
        </View>

        <View style={styles.searchWrap}>
          <HomeSearchBar value={searchQuery} onChangeText={onSearchChange} onClear={onSearchClear} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + layout.homeSafeBottom }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.listCard}>
            <HomeTreeSectionHead />
            <HomeLearningTree
              plans={plans}
              recentPlanId={recentPlanId}
              expandedPlanIds={expandedPlanIds}
              playerResourceId={playerResourceId}
              searchQuery={searchQuery}
              onToggleExpanded={onToggleExpanded}
              onContinuePress={onContinuePress}
              onResourcePress={onResourcePress}
              onResourceDetailPress={onResourceDetailPress}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: homeTheme.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerCopy: {
    flex: 1,
    minWidth: 0,
  },
  manageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: homeTheme.primaryBorder,
  },
  manageText: {
    color: homeTheme.primaryDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  listCard: {
    padding: 14,
    borderRadius: 24,
    backgroundColor: homeTheme.cardBg,
    borderWidth: 1,
    borderColor: homeTheme.lineStrong,
    shadowColor: homeTheme.planShadow.color,
    shadowOffset: homeTheme.planShadow.offset,
    shadowOpacity: homeTheme.planShadow.opacity,
    shadowRadius: homeTheme.planShadow.radius,
    elevation: homeTheme.planShadow.elevation,
  },
});
