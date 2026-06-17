import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import type { StudyPlan } from '@/types/studyPlan';

import { HomeLearningTree } from './HomeLearningTree';
import { HomeSearchBar } from './HomeSearchBar';

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
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="收起我的学习">
            <FontAwesome name="chevron-down" size={16} color="#64748b" />
          </Pressable>
          <View style={styles.headerCopy}>
            <AppText style={styles.headerTitle}>我的学习</AppText>
            <AppText style={styles.headerDesc}>支持搜索合集与资源</AppText>
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
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
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
  headerTitle: {
    color: colors.textMain,
    fontSize: 18,
    fontWeight: '900',
  },
  headerDesc: {
    marginTop: 2,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  manageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#ecfeff',
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  manageText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '900',
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
