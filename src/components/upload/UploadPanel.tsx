import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';

type UploadPanelProps = {
  title: string;
  badge?: string;
  badgeType?: 'required' | 'optional' | 'folder';
  children: ReactNode;
};

export function UploadPanel({ title, badge, badgeType = 'required', children }: UploadPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <AppText style={styles.title}>{title}</AppText>
        {badge ? (
          <View
            style={[
              styles.badge,
              badgeType === 'optional' && styles.optionalBadge,
              badgeType === 'folder' && styles.folderBadge,
            ]}
          >
            <AppText
              style={[
                styles.badgeText,
                badgeType === 'optional' && styles.optionalBadgeText,
                badgeType === 'folder' && styles.folderBadgeText,
              ]}
            >
              {badge}
            </AppText>
          </View>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginBottom: 12,
    padding: 15,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.92)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.038,
    shadowRadius: 14,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  title: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.1,
  },
  badge: {
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.metricBlueBg,
    borderWidth: 1,
    borderColor: colors.playBtnBorder,
  },
  optionalBadge: {
    backgroundColor: '#f1f5f9',
    borderColor: 'rgba(226,232,240,0.9)',
  },
  folderBadge: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  badgeText: {
    color: colors.playBtn,
    fontSize: 11,
    fontWeight: '900',
  },
  optionalBadgeText: {
    color: colors.textMuted,
  },
  folderBadgeText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
});
