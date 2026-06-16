import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { stripResourceTitle } from '@/utils/resourceDetail';

type ResourceDetailNavBarProps = {
  title: string;
  onBack: () => void;
  onOpenInfo: () => void;
};

export function ResourceDetailNavBar({ title, onBack, onOpenInfo }: ResourceDetailNavBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.iconButton} onPress={onBack} accessibilityLabel="返回上一页">
        <FontAwesome name="chevron-left" size={15} color="#334155" />
      </Pressable>
      <AppText style={styles.title} numberOfLines={1}>
        {stripResourceTitle(title)}
      </AppText>
      <Pressable style={styles.iconButton} onPress={onOpenInfo} accessibilityLabel="查看详情">
        <FontAwesome name="ellipsis-h" size={15} color="#334155" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: 'rgba(248,250,252,0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.72)',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
});
