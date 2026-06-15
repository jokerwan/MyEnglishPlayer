import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type UploadSubtitleCardProps = {
  selected: boolean;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function UploadSubtitleCard({
  selected,
  title,
  subtitle,
  onPress,
}: UploadSubtitleCardProps) {
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
          <FontAwesome name="file-text-o" size={16} color={selected ? colors.white : colors.playBtn} />
        </View>
        <View style={styles.copy}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </View>
      </View>
      <FontAwesome name="angle-right" size={16} color="#cbd5e1" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.bgSoft,
    borderWidth: 1,
    borderColor: '#e5edf4',
  },
  cardSelected: {
    backgroundColor: '#f0fdfa',
    borderColor: 'rgba(20,184,166,0.38)',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,184,166,0.10)',
  },
  iconWrapSelected: {
    backgroundColor: colors.primary,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 3,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
});
