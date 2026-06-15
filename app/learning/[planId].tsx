import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { getStudyPlanById } from '@/data/mockStudyPlans';

export default function LearningPlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const plan = getStudyPlanById(planId);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.nav}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={16} color={colors.textMain} />
        </Pressable>
        <AppText variant="sectionTitle">资源列表</AppText>
        <View style={styles.spacer} />
      </View>
      <View style={styles.body}>
        <AppText variant="sectionTitle">{plan?.title ?? '学习合集'}</AppText>
        <AppText variant="sectionDesc" style={styles.description}>
          合集资源列表将在后续阶段实现。
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 36,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  description: {
    marginTop: 8,
  },
});
