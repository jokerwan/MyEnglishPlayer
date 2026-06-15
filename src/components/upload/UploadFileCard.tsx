import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type UploadFileCardProps = {
  selected: boolean;
  hasError: boolean;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function UploadFileCard({
  selected,
  hasError,
  title,
  subtitle,
  onPress,
}: UploadFileCardProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={selected ? ['#f0fdfa', '#ecfeff'] : ['#ffffff', '#f8fffd']}
        style={[
          styles.card,
          selected && styles.cardSelected,
          hasError && styles.cardError,
        ]}
      >
        <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
          <FontAwesome
            name={selected ? 'check' : 'cloud-upload'}
            size={selected ? 20 : 23}
            color={selected ? colors.white : colors.playBtn}
          />
        </View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(20,184,166,0.36)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  cardSelected: {
    borderStyle: 'solid',
    borderColor: 'rgba(20,184,166,0.46)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 2,
  },
  cardError: {
    borderColor: 'rgba(239,68,68,0.55)',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
  },
  iconWrapSelected: {
    backgroundColor: colors.primary,
  },
  title: {
    marginTop: 2,
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
