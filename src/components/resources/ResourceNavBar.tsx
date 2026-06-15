import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type ResourceNavBarProps = {
  onBack: () => void;
  onUpload: () => void;
};

export function ResourceNavBar({ onBack, onUpload }: ResourceNavBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.iconButton} onPress={onBack} accessibilityLabel="返回首页">
        <FontAwesome name="chevron-left" size={15} color="#334155" style={styles.backIcon} />
      </Pressable>

      <View style={styles.titleWrap}>
        <AppText style={styles.title}>我的资源</AppText>
        <AppText style={styles.subtitle}>资源库</AppText>
      </View>

      <Pressable style={styles.iconButton} onPress={onUpload} accessibilityLabel="上传资源">
        <FontAwesome name="cloud-upload" size={15} color={colors.playBtn} />
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
    backgroundColor: 'rgba(248,255,253,0.9)',
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
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.045,
    shadowRadius: 10,
    elevation: 2,
  },
  backIcon: {
    marginLeft: -1,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 3,
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
});
