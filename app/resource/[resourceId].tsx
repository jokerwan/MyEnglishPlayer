import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { DetailToolbar } from '@/components/resource-detail/DetailToolbar';
import { IntensiveListenOverlay } from '@/components/resource-detail/IntensiveListenOverlay';
import { ResourceDetailNavBar } from '@/components/resource-detail/ResourceDetailNavBar';
import { ResourceInfoSheet } from '@/components/resource-detail/ResourceInfoSheet';
import { ResourceMetaRow } from '@/components/resource-detail/ResourceMetaRow';
import { ResourceVideoStage } from '@/components/resource-detail/ResourceVideoStage';
import { TranscriptList } from '@/components/resource-detail/TranscriptList';
import { colors } from '@/constants/colors';
import { usePlayer, useToast } from '@/hooks/useAppContext';
import { useResourceDetail } from '@/hooks/useResourceDetail';

export default function ResourceDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const { playResource } = usePlayer();
  const { resourceId } = useLocalSearchParams<{ resourceId: string }>();
  const detailState = useResourceDetail(resourceId);
  const { detail } = detailState;

  if (!detail) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ResourceDetailNavBar
          title="资源详情"
          onBack={() => router.back()}
          onOpenInfo={() => showToast('未找到资源详情')}
        />
        <View style={styles.missing}>
          <AppText variant="sectionDesc">未找到该资源详情</AppText>
        </View>
      </View>
    );
  }

  const isVideo = detail.type === 'video';
  const cleanTitle = detail.title.replace(/\.(mp4|mp3)$/i, '');

  const handlePlayToggle = () => {
    const nextPlaying = !detailState.isPlaying;
    detailState.togglePlay();
    playResource(detail.id, cleanTitle, `来自：${detail.folder}`);
    showToast(nextPlaying ? `正在播放：${cleanTitle}` : `暂停：${cleanTitle}`);
  };

  const handleSelectSentence = (index: number) => {
    detailState.selectSentence(index);
    const line = detail.transcript[index];
    if (line) {
      showToast(`已定位到 ${line.time}`);
    }
  };

  const handleSpeed = () => {
    detailState.cycleSpeed();
    showToast(`已切换到 ${detailState.speedLabel}`);
  };

  const handleShadow = () => {
    showToast('进入跟读练习');
  };

  const handleIntensive = () => {
    detailState.openIntensive();
  };

  const handlePrimaryAction = () => {
    const result = detailState.handlePrimaryAction();
    showToast(result.message);
    detailState.closeInfoSheet();
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#f8fffd', '#f8fafc', '#eef9f7']}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={{ paddingTop: insets.top }}>
        <ResourceDetailNavBar
          title={detail.title}
          onBack={() => router.back()}
          onOpenInfo={() => detailState.openInfoSheet('notes')}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isVideo ? (
          <ResourceVideoStage title={detail.title} mediaLabel="视频" />
        ) : null}

        <ResourceMetaRow
          modeTitle={isVideo ? '视频原文' : '原文'}
          folder={detail.folder}
          duration={detail.duration}
          level={detail.level}
          hasSubtitle={detail.hasSubtitle}
        />

        <TranscriptList
          lines={detail.transcript}
          activeIndex={detailState.activeSentenceIndex}
          onSelectLine={handleSelectSentence}
        />

        <View style={styles.safeBottom} />
      </ScrollView>

      <DetailToolbar
        currentTime={detailState.currentTimeLabel}
        totalTime={detailState.totalTimeLabel}
        progress={detailState.progressPercent}
        speedLabel={detailState.speedLabel}
        isPlaying={detailState.isPlaying}
        onSpeedPress={handleSpeed}
        onShadowPress={handleShadow}
        onIntensivePress={handleIntensive}
        onPrevPress={detailState.selectPrevSentence}
        onPlayPress={handlePlayToggle}
        onNextPress={detailState.selectNextSentence}
      />

      <IntensiveListenOverlay
        visible={detailState.intensiveVisible}
        english={detailState.activeSentence?.en ?? ''}
        chinese={detailState.activeSentence?.zh ?? ''}
        onClose={detailState.closeIntensive}
      />

      <ResourceInfoSheet
        visible={detailState.infoVisible}
        activeTab={detailState.infoTab}
        note={detailState.note}
        words={detail.words}
        listenCount={detail.stats.listenCount}
        shadowCount={detail.stats.shadowCount}
        savedPhraseCount={detail.stats.savedPhraseCount}
        primaryLabel={detailState.primaryAction.label}
        primaryIcon={detailState.primaryAction.icon}
        onChangeTab={detailState.setInfoTab}
        onChangeNote={detailState.updateNote}
        onPrimaryPress={handlePrimaryAction}
        onClose={detailState.closeInfoSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgSoft,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  safeBottom: {
    height: 24,
  },
  missing: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
