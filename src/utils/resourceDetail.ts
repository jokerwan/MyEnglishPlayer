import type { ResourceDetail, TranscriptLine, KeywordChip } from '@/types/resourceDetail';
import type { ResourceLibraryItem } from '@/types/resource';
import type { StudyPlanResource } from '@/types/studyPlan';

export const DETAIL_SPEEDS = [1, 1.25, 1.5, 0.75] as const;

export function stripResourceTitle(title: string) {
  return title.replace(/\.(mp4|mp3|wav|m4a)$/i, '').trim();
}

export function coverCodeFromTitle(title: string) {
  const clean = stripResourceTitle(title);
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('');
  }
  return clean.slice(0, 3).toUpperCase();
}

export function parseDurationToSeconds(duration: string) {
  const [mins, secs] = duration.split(':').map((value) => Number(value) || 0);
  return mins * 60 + secs;
}

export function formatClockTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function timeLabelToSeconds(time: string) {
  const [mins, secs] = time.split(':').map((value) => Number(value) || 0);
  return mins * 60 + secs;
}

export function progressToCurrentTime(durationSeconds: number, progress: number) {
  if (durationSeconds <= 0) {
    return 0;
  }
  return Math.floor((durationSeconds * Math.max(0, Math.min(100, progress))) / 100);
}

export function formatSpeedLabel(speed: number) {
  const text = speed % 1 === 0 ? speed.toFixed(1) : speed.toFixed(2);
  return `${text.replace(/\.00$/, '.0')}x`;
}

function getTranscriptPack(title: string) {
  const normalized = stripResourceTitle(title).toLowerCase();

  if (normalized.includes('color')) {
    return {
      lines: [
        {
          time: '00:36',
          en: 'Red, yellow, green and blue. What color do you see?',
          zh: '红色、黄色、绿色和蓝色。你看到了什么颜色？',
        },
        {
          time: '01:12',
          en: 'I can see a blue car and a yellow bus.',
          zh: '我能看到一辆蓝色小汽车和一辆黄色公交车。',
        },
        {
          time: '02:05',
          en: 'Let us say the colors one more time.',
          zh: '让我们再说一遍这些颜色吧。',
        },
      ],
      words: [
        { en: 'red', zh: '红色' },
        { en: 'blue', zh: '蓝色' },
        { en: 'yellow', zh: '黄色' },
        { en: 'one more time', zh: '再一次' },
      ],
    };
  }

  if (normalized.includes('bath')) {
    return {
      lines: [
        { time: '00:28', en: 'It is bath time. Let us wash our hands.', zh: '洗澡时间到了。我们来洗洗手。' },
        { time: '01:06', en: 'Use soap and warm water.', zh: '用香皂和温水。' },
        { time: '01:52', en: 'All clean! Great job today.', zh: '洗干净啦！今天做得很好。' },
      ],
      words: [
        { en: 'bath time', zh: '洗澡时间' },
        { en: 'soap', zh: '香皂' },
        { en: 'warm water', zh: '温水' },
        { en: 'all clean', zh: '洗干净了' },
      ],
    };
  }

  if (normalized.includes('dino')) {
    return {
      lines: [
        {
          time: '00:42',
          en: 'The dinosaur has a long tail and strong legs.',
          zh: '这只恐龙有长尾巴和强壮的腿。',
        },
        { time: '01:20', en: 'Can you say the dinosaur name?', zh: '你能说出这只恐龙的名字吗？' },
        { time: '02:10', en: 'Listen again and repeat after me.', zh: '再听一遍，跟着我重复。' },
      ],
      words: [
        { en: 'dinosaur', zh: '恐龙' },
        { en: 'long tail', zh: '长尾巴' },
        { en: 'strong legs', zh: '强壮的腿' },
        { en: 'repeat', zh: '重复' },
      ],
    };
  }

  return {
    lines: [
      {
        time: '03:45',
        en: 'Touch your head, shoulders, knees and toes.',
        zh: '摸摸你的头、肩膀、膝盖和脚趾。',
      },
      { time: '04:18', en: 'Can you point to your eyes and ears?', zh: '你能指一指你的眼睛和耳朵吗？' },
      { time: '05:02', en: "Great job! Let's sing it one more time.", zh: '做得真棒！我们再唱一遍吧。' },
    ],
    words: [
      { en: 'body', zh: '身体' },
      { en: 'shoulders', zh: '肩膀' },
      { en: 'point to', zh: '指向' },
      { en: 'one more time', zh: '再一次' },
      { en: 'great job', zh: '做得好' },
    ],
  };
}

function buildStats(studyStatus: ResourceDetail['studyStatus'], hasSubtitle: boolean): ResourceDetail['stats'] {
  return {
    listenCount: studyStatus === 'none' ? 0 : studyStatus === 'done' ? 6 : 4,
    shadowCount: hasSubtitle ? 5 : 0,
    savedPhraseCount: hasSubtitle ? 12 : 3,
    note: '',
  };
}

export function buildResourceDetailFromLibraryItem(
  item: ResourceLibraryItem,
  options?: { studyStatus?: ResourceDetail['studyStatus']; progress?: number },
): ResourceDetail {
  const transcriptPack = getTranscriptPack(item.title);
  const studyStatus = options?.studyStatus ?? 'none';
  const progress =
    options?.progress ?? (studyStatus === 'done' ? 100 : studyStatus === 'learning' ? 41 : 0);

  return {
    id: item.id,
    title: item.title,
    folder: item.folder,
    type: item.type,
    duration: item.duration,
    durationSeconds: parseDurationToSeconds(item.duration),
    level: item.level,
    hasSubtitle: item.hasSubtitle,
    tag: item.tag,
    studyStatus,
    progress,
    cover: coverCodeFromTitle(item.title),
    transcript: transcriptPack.lines,
    words: transcriptPack.words,
    stats: buildStats(studyStatus, item.hasSubtitle),
  };
}

export function buildResourceDetailFromStudyResource(
  resource: StudyPlanResource,
  folder: string,
): ResourceDetail {
  const title = resource.title;
  const transcriptPack = getTranscriptPack(title);
  const hasSubtitle = /有字幕|字幕/.test(resource.meta);
  const level = resource.meta.includes('中级') ? '中级' : resource.meta.includes('高级') ? '高级' : '初级';
  const duration = resource.meta.match(/\d{1,2}:\d{2}/)?.[0] ?? '08:00';
  const studyStatus = resource.done ? 'done' : resource.progress > 0 ? 'learning' : 'none';

  return {
    id: resource.id,
    title,
    folder,
    type: /mp3|音频/i.test(title) ? 'audio' : 'video',
    duration,
    durationSeconds: parseDurationToSeconds(duration),
    level,
    hasSubtitle,
    tag: resource.meta.split('·').pop()?.trim() ?? '听力资源',
    studyStatus,
    progress: resource.done ? 100 : resource.progress,
    cover: resource.cover || coverCodeFromTitle(title),
    transcript: transcriptPack.lines,
    words: transcriptPack.words,
    stats: buildStats(studyStatus, hasSubtitle),
  };
}

export function sentenceProgressPercent(
  durationSeconds: number,
  sentence: TranscriptLine,
  index: number,
  total: number,
) {
  if (durationSeconds <= 0) {
    return 18;
  }
  const seconds = timeLabelToSeconds(sentence.time);
  const percent = (seconds / durationSeconds) * 100;
  if (percent > 0) {
    return Math.max(8, Math.min(96, Math.round(percent)));
  }
  return Math.max(8, Math.min(96, Math.round(((index + 1) / total) * 100)));
}
