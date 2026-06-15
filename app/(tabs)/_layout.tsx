import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/common/AppText';
import { MiniPlayer } from '@/components/navigation/MiniPlayer';
import { colors } from '@/constants/colors';

const TAB_CONFIG = [
  { name: 'index', label: '首页', icon: 'home' },
  { name: 'listening', label: '听力库', icon: 'headphones' },
  { name: 'vocabulary', label: '单词本', icon: 'book' },
  { name: 'profile', label: '我的', icon: 'user' },
] as const;

type TabRoute = {
  key: string;
  name: string;
};

type AppTabBarProps = {
  state: {
    index: number;
    routes: TabRoute[];
  };
  navigation: {
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault?: true;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

function AppTabBar({ state, navigation }: AppTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <MiniPlayer />
      <View style={styles.tabRow}>
        {state.routes.map((route: TabRoute, index: number) => {
          const config = TAB_CONFIG.find((item) => item.name === route.name);
          if (!config) {
            return null;
          }

          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              style={styles.tabButton}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={config.label}
            >
              <FontAwesome
                name={config.icon}
                size={20}
                color={isFocused ? colors.primary : colors.tabInactive}
              />
              <AppText style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {config.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <AppTabBar state={props.state} navigation={props.navigation as AppTabBarProps['navigation']} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: '首页' }} />
      <Tabs.Screen name="listening" options={{ title: '听力库' }} />
      <Tabs.Screen name="vocabulary" options={{ title: '单词本' }} />
      <Tabs.Screen name="profile" options={{ title: '我的' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lineSoft,
  },
  tabRow: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.tabInactive,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
