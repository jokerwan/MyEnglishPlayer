import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { ProfileMenuRow } from '@/components/profile/ProfileMenuRow';
import { ProfileStatsSection } from '@/components/profile/ProfileStatsSection';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { mockHomeStats } from '@/data/mockHome';
import { mockUser } from '@/data/mockUser';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + layout.homeSafeBottom }]}
      >
        <View style={styles.headerCard}>
          <LinearGradient
            colors={['#ffffff', '#f4fffd', '#ecfeff']}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.headerRow}>
            <View>
              <AppText style={styles.name}>{mockUser.name}</AppText>
              <AppText style={styles.headerDesc}>坚持听、跟读、积累表达</AppText>
            </View>
            <View style={styles.streakBadge}>
              <AppText style={styles.streakDays}>{mockUser.streakDays}</AppText>
              <AppText style={styles.streakLabel}>连续学习</AppText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ProfileStatsSection
            trendLabel={mockHomeStats.trendLabel}
            metrics={mockHomeStats.metrics}
          />
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>常用功能</AppText>
          <View style={styles.menuList}>
            <ProfileMenuRow
              icon="cloud-upload"
              iconBg="#ecfeff"
              iconColor="#0f766e"
              title="上传资源"
              subtitle="添加本地音视频到资源库"
              onPress={() => router.push('/upload')}
            />
            <ProfileMenuRow
              icon="folder-open-o"
              iconBg="#ecfdf5"
              iconColor="#059669"
              title="我的资源"
              subtitle="浏览文件夹并管理学习内容"
              onPress={() => router.push('/resources')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  scrollContent: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 12,
  },
  headerCard: {
    overflow: 'hidden',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  name: {
    color: colors.textMain,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerDesc: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  streakBadge: {
    width: 72,
    height: 78,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
  },
  streakDays: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 28,
  },
  streakLabel: {
    marginTop: 8,
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '900',
  },
  menuList: {
    gap: 10,
  },
});
