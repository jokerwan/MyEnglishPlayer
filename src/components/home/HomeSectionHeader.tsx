import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';

type HomeSectionHeaderProps = {
  title: string;
  onMorePress?: () => void;
  moreLabel?: string;
};

export function HomeSectionHeader({
  title,
  onMorePress,
  moreLabel = '更多',
}: HomeSectionHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      {onMorePress ? (
        <Pressable style={styles.moreButton} onPress={onMorePress} hitSlop={8}>
          <AppText style={styles.moreText}>{moreLabel}</AppText>
          <FontAwesome name="angle-right" size={14} color={homeTheme.subtle} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    color: homeTheme.ink,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  moreText: {
    color: homeTheme.subtle,
    fontSize: 13,
    fontWeight: '700',
  },
});
