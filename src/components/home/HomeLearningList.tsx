import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { HomeLearningPlanCard } from '@/components/home/HomeLearningPlanCard';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import type { StudyPlan } from '@/types/studyPlan';

type HomeLearningListProps = {
  plans: StudyPlan[];
  onManagePress: () => void;
  onPlanPress: (plan: StudyPlan) => void;
  onPlanPlayPress: (plan: StudyPlan) => void;
};

export function HomeLearningList({
  plans,
  onManagePress,
  onPlanPress,
  onPlanPlayPress,
}: HomeLearningListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppText variant="sectionTitle">我的学习</AppText>
          <AppText variant="sectionDesc">正在学习的内容会显示在这里</AppText>
        </View>
        <Pressable style={styles.manageButton} onPress={onManagePress}>
          <AppText style={styles.manageText}>管理 </AppText>
          <FontAwesome name="angle-right" size={14} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {plans.map((plan) => (
          <HomeLearningPlanCard
            key={plan.id}
            plan={plan}
            onPress={() => onPlanPress(plan)}
            onPlayPress={() => onPlanPlayPress(plan)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    padding: 18,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lineSoft,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  list: {
    gap: 11,
    marginTop: 14,
  },
});
