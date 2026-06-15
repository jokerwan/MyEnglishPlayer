import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import type { QuickAction } from '@/types/home';

type HomeQuickActionsProps = {
  actions: QuickAction[];
  onPress: (actionId: QuickAction['id']) => void;
};

const toneStyles = {
  blue: { color: colors.primary, backgroundColor: colors.quickBlueBg },
  green: { color: colors.secondaryDark, backgroundColor: colors.quickGreenBg },
  amber: { color: colors.quickAmber, backgroundColor: colors.quickAmberBg },
} as const;

export function HomeQuickActions({ actions, onPress }: HomeQuickActionsProps) {
  return (
    <View style={styles.grid}>
      {actions.map((action) => {
        const tone = toneStyles[action.tone];
        return (
          <Pressable
            key={action.id}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => onPress(action.id)}
          >
            <View style={[styles.icon, { backgroundColor: tone.backgroundColor }]}>
              <FontAwesome name={action.icon} size={16} color={tone.color} />
            </View>
            <AppText style={styles.label}>{action.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lineSoft,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.045,
    shadowRadius: 12,
    elevation: 2,
  },
  buttonPressed: {
    transform: [{ translateY: -2 }],
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 8,
    color: colors.textSlate,
    fontSize: 12,
    fontWeight: '800',
  },
});
