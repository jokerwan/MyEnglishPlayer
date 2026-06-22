import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { homeTheme } from '@/constants/homeTheme';
import { mockHomeRecommendations, type HomeRecommendation } from '@/data/mockHomeRecommendations';

import { HomeSectionHeader } from './HomeSectionHeader';

type HomeRecommendedResourcesProps = {
  onMorePress: () => void;
  onItemPress: (item: HomeRecommendation) => void;
};

function RecommendationCover({ item }: { item: HomeRecommendation }) {
  return (
    <View style={styles.coverWrap}>
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['transparent', 'rgba(15,23,42,0.35)']}
        style={styles.coverOverlay}
      />
      <View style={styles.coverIconWrap}>
        <FontAwesome name={item.icon} size={22} color="rgba(255,255,255,0.92)" />
      </View>
      <View style={styles.coverAccent} />
      <View style={styles.coverDots}>
        <View style={styles.coverDot} />
        <View style={[styles.coverDot, styles.coverDotMid]} />
        <View style={[styles.coverDot, styles.coverDotSmall]} />
      </View>
    </View>
  );
}

export function HomeRecommendedResources({ onMorePress, onItemPress }: HomeRecommendedResourcesProps) {
  return (
    <View>
      <HomeSectionHeader title="推荐资源" onMorePress={onMorePress} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockHomeRecommendations.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onItemPress(item)}
          >
            <RecommendationCover item={item} />
            <View style={styles.cardBody}>
              <AppText style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </AppText>
              <AppText style={styles.cardMeta}>{item.resourceCount} 个资源</AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 12,
    paddingRight: 2,
  },
  card: {
    width: 140,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: homeTheme.line,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  coverWrap: {
    height: 92,
    overflow: 'hidden',
    position: 'relative',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
  },
  coverIconWrap: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  coverAccent: {
    position: 'absolute',
    right: -12,
    top: -18,
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  coverDots: {
    position: 'absolute',
    right: 10,
    top: 10,
    gap: 4,
  },
  coverDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignSelf: 'flex-end',
  },
  coverDotMid: {
    width: 5,
    height: 5,
    opacity: 0.75,
  },
  coverDotSmall: {
    width: 4,
    height: 4,
    opacity: 0.55,
  },
  cardBody: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    color: homeTheme.ink,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
    minHeight: 34,
  },
  cardMeta: {
    marginTop: 4,
    color: homeTheme.subtle,
    fontSize: 11,
    fontWeight: '700',
  },
});
