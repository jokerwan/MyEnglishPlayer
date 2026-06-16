import { useCallback, useEffect, useMemo, useState } from 'react';

import { getResourceDetailById } from '@/data/mockResourceDetails';
import type { ResourceInfoTab, ResourceDetail } from '@/types/resourceDetail';
import {
  DETAIL_SPEEDS,
  formatClockTime,
  formatSpeedLabel,
  progressToCurrentTime,
  sentenceProgressPercent,
  timeLabelToSeconds,
} from '@/utils/resourceDetail';

export function useResourceDetail(resourceId: string) {
  const initialDetail = useMemo(() => getResourceDetailById(resourceId), [resourceId]);
  const [detail, setDetail] = useState<ResourceDetail | null>(initialDetail);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoTab, setInfoTab] = useState<ResourceInfoTab>('notes');
  const [intensiveVisible, setIntensiveVisible] = useState(false);
  const [note, setNote] = useState(initialDetail?.stats.note ?? '');

  useEffect(() => {
    setDetail(initialDetail);
    setActiveSentenceIndex(0);
    setIsPlaying(false);
    setSpeedIndex(0);
    setInfoVisible(false);
    setInfoTab('notes');
    setIntensiveVisible(false);
    setNote(initialDetail?.stats.note ?? '');
  }, [initialDetail, resourceId]);

  const currentSpeed = DETAIL_SPEEDS[speedIndex];
  const activeSentence = detail?.transcript[activeSentenceIndex] ?? null;

  const currentTimeSeconds = useMemo(() => {
    if (!detail) {
      return 0;
    }
    if (activeSentence) {
      return timeLabelToSeconds(activeSentence.time);
    }
    return progressToCurrentTime(detail.durationSeconds, detail.progress);
  }, [activeSentence, detail]);

  const progressPercent = useMemo(() => {
    if (!detail) {
      return 0;
    }
    if (activeSentence) {
      return sentenceProgressPercent(
        detail.durationSeconds,
        activeSentence,
        activeSentenceIndex,
        detail.transcript.length,
      );
    }
    return detail.progress;
  }, [activeSentence, activeSentenceIndex, detail]);

  const primaryAction = useMemo(() => {
    if (!detail) {
      return { label: '加入学习', icon: 'plus' as const, tone: 'primary' as const };
    }
    if (detail.studyStatus === 'learning') {
      return { label: '完成学习', icon: 'check' as const, tone: 'default' as const };
    }
    if (detail.studyStatus === 'done') {
      return { label: '重新学习', icon: 'refresh' as const, tone: 'default' as const };
    }
    return { label: '加入学习', icon: 'plus' as const, tone: 'primary' as const };
  }, [detail]);

  const selectSentence = useCallback(
    (index: number) => {
      if (!detail) {
        return;
      }
      const nextIndex = Math.max(0, Math.min(detail.transcript.length - 1, index));
      setActiveSentenceIndex(nextIndex);
    },
    [detail],
  );

  const selectPrevSentence = useCallback(() => {
    selectSentence(activeSentenceIndex - 1);
  }, [activeSentenceIndex, selectSentence]);

  const selectNextSentence = useCallback(() => {
    selectSentence(activeSentenceIndex + 1);
  }, [activeSentenceIndex, selectSentence]);

  const togglePlay = useCallback(() => {
    setIsPlaying((current) => !current);
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeedIndex((current) => (current + 1) % DETAIL_SPEEDS.length);
  }, []);

  const openInfoSheet = useCallback((tab: ResourceInfoTab = 'notes') => {
    setInfoTab(tab);
    setInfoVisible(true);
  }, []);

  const closeInfoSheet = useCallback(() => {
    setInfoVisible(false);
  }, []);

  const openIntensive = useCallback(() => {
    setIntensiveVisible(true);
  }, []);

  const closeIntensive = useCallback(() => {
    setIntensiveVisible(false);
  }, []);

  const handlePrimaryAction = useCallback(() => {
    if (!detail) {
      return { ok: false as const, message: '资源不存在' };
    }

    if (detail.studyStatus === 'none') {
      setDetail((current) =>
        current
          ? {
              ...current,
              studyStatus: 'learning',
              progress: 15,
              stats: { ...current.stats, listenCount: 1 },
            }
          : current,
      );
      return { ok: true as const, message: `已加入学习：${detail.title.replace(/\.(mp4|mp3)$/i, '')}` };
    }

    if (detail.studyStatus === 'learning') {
      setDetail((current) =>
        current
          ? {
              ...current,
              studyStatus: 'done',
              progress: 100,
              stats: { ...current.stats, listenCount: current.stats.listenCount + 1 },
            }
          : current,
      );
      return { ok: true as const, message: `已完成学习：${detail.title.replace(/\.(mp4|mp3)$/i, '')}` };
    }

    setDetail((current) =>
      current
        ? {
            ...current,
            studyStatus: 'learning',
            progress: 0,
            stats: { ...current.stats, listenCount: current.stats.listenCount + 1 },
          }
        : current,
    );
    return { ok: true as const, message: `已重新开始学习：${detail.title.replace(/\.(mp4|mp3)$/i, '')}` };
  }, [detail]);

  const updateNote = useCallback((value: string) => {
    setNote(value);
    setDetail((current) =>
      current
        ? {
            ...current,
            stats: {
              ...current.stats,
              note: value,
            },
          }
        : current,
    );
  }, []);

  return {
    detail,
    activeSentenceIndex,
    activeSentence,
    isPlaying,
    currentSpeed,
    speedLabel: formatSpeedLabel(currentSpeed),
    currentTimeLabel: formatClockTime(currentTimeSeconds),
    totalTimeLabel: detail?.duration ?? '00:00',
    progressPercent,
    infoVisible,
    infoTab,
    intensiveVisible,
    note,
    primaryAction,
    selectSentence,
    selectPrevSentence,
    selectNextSentence,
    togglePlay,
    cycleSpeed,
    openInfoSheet,
    closeInfoSheet,
    setInfoTab,
    openIntensive,
    closeIntensive,
    handlePrimaryAction,
    updateNote,
  };
}
