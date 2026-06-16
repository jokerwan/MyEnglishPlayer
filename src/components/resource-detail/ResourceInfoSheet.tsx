import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import type { KeywordChip, ResourceInfoTab } from '@/types/resourceDetail';

import {
  ResourceNotesPane,
  ResourceStatsPane,
  ResourceWordsPane,
} from './ResourceInfoPanes';

type ResourceInfoSheetProps = {
  visible: boolean;
  activeTab: ResourceInfoTab;
  note: string;
  words: KeywordChip[];
  listenCount: number;
  shadowCount: number;
  savedPhraseCount: number;
  primaryLabel: string;
  primaryIcon: 'plus' | 'check' | 'refresh';
  onChangeTab: (tab: ResourceInfoTab) => void;
  onChangeNote: (value: string) => void;
  onPrimaryPress: () => void;
  onClose: () => void;
};

const TABS: { id: ResourceInfoTab; label: string }[] = [
  { id: 'notes', label: '笔记' },
  { id: 'words', label: '生词' },
  { id: 'stats', label: '统计' },
];

export function ResourceInfoSheet({
  visible,
  activeTab,
  note,
  words,
  listenCount,
  shadowCount,
  savedPhraseCount,
  primaryLabel,
  primaryIcon,
  onChangeTab,
  onChangeNote,
  onPrimaryPress,
  onClose,
}: ResourceInfoSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.mask} onPress={onClose} accessibilityLabel="关闭详情" />

        <View style={[styles.panel, { paddingBottom: Math.max(insets.bottom, 22) }]}>
          <View style={styles.head}>
            <AppText style={styles.title}>详情</AppText>
            <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="关闭">
              <FontAwesome name="times" size={15} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.tabs}>
            {TABS.map((tab) => (
              <Pressable
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                onPress={() => onChangeTab(tab.id)}
              >
                <AppText style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                  {tab.label}
                </AppText>
              </Pressable>
            ))}
          </View>

          <View style={styles.body}>
            {activeTab === 'notes' ? (
              <ResourceNotesPane note={note} onChangeNote={onChangeNote} />
            ) : null}
            {activeTab === 'words' ? <ResourceWordsPane words={words} /> : null}
            {activeTab === 'stats' ? (
              <ResourceStatsPane
                listenCount={listenCount}
                shadowCount={shadowCount}
                savedPhraseCount={savedPhraseCount}
                primaryLabel={primaryLabel}
                primaryIcon={primaryIcon}
                onPrimaryPress={onPrimaryPress}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mask: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15,23,42,0.32)',
  },
  panel: {
    paddingTop: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.18,
    shadowRadius: 44,
    elevation: 12,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#0f172a',
    fontSize: 17,
    fontWeight: '900',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.82)',
  },
  tab: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#ecfeff',
  },
  tabText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '900',
  },
  tabTextActive: {
    color: '#0f766e',
  },
  body: {
    minHeight: 180,
    paddingTop: 14,
  },
});
