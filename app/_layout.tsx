import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Toast } from '@/components/common/Toast';
import { AppProviders, useToast } from '@/hooks/useAppContext';

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const { message, visible } = useToast();

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="upload" />
        <Stack.Screen name="resources/index" />
        <Stack.Screen name="learning/index" />
        <Stack.Screen name="resource/[resourceId]" />
      </Stack>
      <Toast message={message} visible={visible} />
    </>
  );
}
