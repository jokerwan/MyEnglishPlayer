import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockPlayerState } from '@/data/mockPlayer';
import type { PlayerState } from '@/types/player';
import { coverCodeFromTitle } from '@/utils/resourceDetail';
import { resolvePlayerResourceId } from '@/utils/playerNavigation';

import { AppDataProvider } from './useAppData';

type ToastContextValue = {
  message: string | null;
  visible: boolean;
  showToast: (message: string) => void;
};

type PlayerContextValue = {
  player: PlayerState;
  togglePlay: () => void;
  playPlan: (title: string, subtitle?: string) => void;
  playResource: (resourceId: string, title: string, subtitle?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const PlayerContext = createContext<PlayerContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [player, setPlayer] = useState<PlayerState>(mockPlayerState);

  const showToast = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
    setVisible(true);
    setTimeout(() => setVisible(false), 2200);
  }, []);

  const togglePlay = useCallback(() => {
    setPlayer((current) => ({
      ...current,
      isPlaying: !current.isPlaying,
    }));
  }, []);

  const playPlan = useCallback((title: string, subtitle = '来自：我的学习') => {
    const resourceId = resolvePlayerResourceId(title);
    setPlayer((current) => ({
      ...current,
      resourceId,
      title,
      subtitle,
      cover: coverCodeFromTitle(title),
      isPlaying: true,
      currentTimeSeconds: 0,
    }));
  }, []);

  const playResource = useCallback(
    (resourceId: string, title: string, subtitle = '来自：资源详情') => {
      setPlayer((current) => ({
        ...current,
        resourceId,
        title,
        subtitle,
        cover: coverCodeFromTitle(title),
        isPlaying: true,
      }));
    },
    [],
  );

  const toastValue = useMemo(
    () => ({
      message,
      visible,
      showToast,
    }),
    [message, visible, showToast],
  );

  const playerValue = useMemo(
    () => ({
      player,
      togglePlay,
      playPlan,
      playResource,
    }),
    [player, togglePlay, playPlan, playResource],
  );

  return (
    <ToastContext.Provider value={toastValue}>
      <PlayerContext.Provider value={playerValue}>
        <AppDataProvider>{children}</AppDataProvider>
      </PlayerContext.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within AppProviders');
  }
  return context;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within AppProviders');
  }
  return context;
}
