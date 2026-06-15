# 前端 MVP 拆解说明

## 本阶段范围

本阶段只做英语听力学习 App 的前端 MVP 拆解，不实现页面代码：

- 不接后端。
- 不开发完整 App。
- 不重新设计产品逻辑。
- 不把代码堆到单个文件。
- 后续页面实现必须严格对齐已确认的 HTML 高保真原型。

## HTML 原型状态

当前仓库中没有发现 `.html` 或 `.htm` 原型文件。因此，本次无法对具体 HTML 页面结构、
视觉层级、文案、组件复用关系、间距、交互状态做逐项确认。

为了避免臆造产品逻辑，以下内容仅作为 Expo + TypeScript 前端 MVP 的拆解基线。等 HTML
原型加入仓库后，必须先补充以下分析，再进入页面开发：

1. 列出 HTML 中的所有页面、弹窗和状态。
2. 将每个页面映射到一个 Expo Router 路由。
3. 从 HTML 中抽取重复 UI 块，形成可复用组件。
4. 按 HTML 中真实字段整理 mock 数据。
5. 保持页面流程、文案、交互逻辑与原型一致。

## React Native 项目目录

下面是建议的 Expo + TypeScript 目录结构。当前阶段只输出目录规划，不创建页面代码。

```text
.
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── library.tsx
│   │   ├── practice.tsx
│   │   └── profile.tsx
│   ├── lesson/
│   │   └── [lessonId].tsx
│   ├── player/
│   │   └── [lessonId].tsx
│   └── modal/
│       └── vocabulary.tsx
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── audio/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.tsx
│   │   │   ├── AppCard.tsx
│   │   │   ├── AppIconButton.tsx
│   │   │   ├── AppText.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Screen.tsx
│   │   ├── lesson/
│   │   │   ├── LessonCard.tsx
│   │   │   ├── LessonHeader.tsx
│   │   │   ├── LessonMeta.tsx
│   │   │   └── LessonSection.tsx
│   │   ├── player/
│   │   │   ├── AudioProgress.tsx
│   │   │   ├── PlaybackControls.tsx
│   │   │   ├── PlaybackSpeedControl.tsx
│   │   │   ├── PlayerHeader.tsx
│   │   │   └── RepeatModeControl.tsx
│   │   ├── transcript/
│   │   │   ├── TranscriptLine.tsx
│   │   │   ├── TranscriptList.tsx
│   │   │   └── WordToken.tsx
│   │   ├── practice/
│   │   │   ├── AnswerOption.tsx
│   │   │   ├── PracticeCard.tsx
│   │   │   └── PracticeResult.tsx
│   │   └── profile/
│   │       ├── DailyGoalCard.tsx
│   │       ├── StatCard.tsx
│   │       └── StreakCard.tsx
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── layout.ts
│   │   └── typography.ts
│   ├── data/
│   │   ├── mockLessons.ts
│   │   ├── mockPractice.ts
│   │   ├── mockProfile.ts
│   │   └── mockVocabulary.ts
│   ├── hooks/
│   │   ├── useAudioPlayer.ts
│   │   └── useMockProgress.ts
│   ├── types/
│   │   ├── audio.ts
│   │   ├── lesson.ts
│   │   ├── practice.ts
│   │   ├── profile.ts
│   │   └── vocabulary.ts
│   └── utils/
│       ├── formatDuration.ts
│       └── mockSelectors.ts
├── TASKS.md
├── package.json
├── tsconfig.json
└── app.json
```

路由名称目前是占位规划。HTML 原型加入后，如果原型中的导航名称、页面数量或页面层级不同，
应以原型为准调整路由。

## 需要创建的组件清单

以下组件是听力学习 MVP 的预拆分边界。真正开发前必须逐一对照 HTML，删除不存在的组件，
补充原型中出现但这里未列出的组件。

### 通用组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `Screen` | 页面安全区、背景色、基础内边距容器。 | 用来统一页面外层结构。 |
| `AppText` | 文本样式封装。 | 将 HTML 中的标题、正文、辅助文字映射成 variant。 |
| `AppButton` | 主按钮、次按钮、文本按钮。 | 需要匹配原型中的尺寸、圆角、禁用态。 |
| `AppIconButton` | 仅图标的可点击按钮。 | 用于播放控制、导航操作等。 |
| `AppCard` | 卡片容器。 | 统一阴影、圆角、边框、间距。 |
| `ProgressBar` | 进度条。 | 可用于课程进度、目标进度、音频进度。 |
| `EmptyState` | 空状态展示。 | 文案必须来自原型或后续确认。 |

### 课程组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `LessonCard` | 课程列表卡片。 | 展示标题、等级、时长、进度等字段。 |
| `LessonHeader` | 课程详情头部区域。 | 可能包含封面、标题、描述和主操作按钮。 |
| `LessonMeta` | 课程元信息行。 | 例如等级、时长、口音、主题、完成度。 |
| `LessonSection` | 课程详情分区容器。 | 用于 transcript、词汇、练习入口等区域。 |

### 播放器组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `PlayerHeader` | 播放页标题和课程上下文。 | 以 HTML 播放页顶部结构为准。 |
| `AudioProgress` | 当前时间、总时长、进度拖动区。 | MVP 阶段可先使用本地 mock 播放状态。 |
| `PlaybackControls` | 播放、暂停、快退、快进等控制。 | 不接后端。 |
| `PlaybackSpeedControl` | 倍速控制。 | 倍速选项以原型为准。 |
| `RepeatModeControl` | 单句循环或课程循环控制。 | 仅在原型存在该功能时实现。 |

### 原文 / 字幕组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `TranscriptList` | 原文列表容器。 | 支持当前播放句高亮。 |
| `TranscriptLine` | 单句原文。 | 是否显示翻译以 HTML 为准。 |
| `WordToken` | 可点击单词或短语。 | 仅在原型存在查词或收藏词功能时实现。 |

### 练习组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `PracticeCard` | 题目卡片。 | 题型必须和 HTML 一致。 |
| `AnswerOption` | 答案选项。 | 支持选中、正确、错误状态。 |
| `PracticeResult` | 答题反馈。 | 分数、解释和提示文案以原型为准。 |

### 个人 / 进度组件

| 组件 | 职责 | 备注 |
| --- | --- | --- |
| `DailyGoalCard` | 每日听力目标。 | MVP 使用 mock 进度数据。 |
| `StreakCard` | 连续学习天数。 | 仅在原型存在时实现。 |
| `StatCard` | 统计数据卡片。 | 例如听力分钟、完成课程、收藏单词。 |

## Mock 数据结构

Mock 数据建议放在 `src/data`，类型放在 `src/types`。以下结构是 MVP 基线，HTML 原型加入后
必须按真实字段调整。

### Lesson

```ts
type Lesson = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  accent?: string;
  durationSeconds: number;
  coverImageUrl?: string;
  audioUrl?: string;
  progress: {
    completed: boolean;
    percent: number;
    lastPositionSeconds: number;
  };
  transcript: TranscriptSegment[];
  vocabulary: VocabularyItem[];
};
```

### TranscriptSegment

```ts
type TranscriptSegment = {
  id: string;
  lessonId: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
  translation?: string;
  isKeySentence?: boolean;
};
```

### VocabularyItem

```ts
type VocabularyItem = {
  id: string;
  lessonId: string;
  word: string;
  phonetic?: string;
  meaning: string;
  example?: string;
  saved: boolean;
};
```

### PracticeQuestion

```ts
type PracticeQuestion = {
  id: string;
  lessonId: string;
  type: 'singleChoice' | 'fillBlank' | 'dictation';
  prompt: string;
  audioSegmentId?: string;
  options?: {
    id: string;
    text: string;
  }[];
  correctOptionId?: string;
  correctText?: string;
  explanation?: string;
};
```

### UserProfile

```ts
type UserProfile = {
  id: string;
  name: string;
  avatarUrl?: string;
  dailyGoalMinutes: number;
  currentStreakDays: number;
  totalListeningMinutes: number;
  completedLessonCount: number;
  savedWordCount: number;
};
```

### PlaybackState

```ts
type PlaybackState = {
  lessonId: string;
  isPlaying: boolean;
  currentTimeSeconds: number;
  durationSeconds: number;
  speed: 0.75 | 1 | 1.25 | 1.5 | 2;
  repeatMode: 'off' | 'segment' | 'lesson';
  activeTranscriptSegmentId?: string;
};
```

## HTML 到 React Native 的拆解检查清单

HTML 原型加入后，按以下顺序更新拆解：

- 确认所有顶层页面、弹窗和交互状态。
- 确认导航顺序、tab 文案和页面标题。
- 抽取重复出现的卡片、按钮、文本、标签、进度条样式。
- 将 CSS 中的颜色、圆角、间距、字体映射为 `constants`。
- 将静态图片、音频资源映射到 `src/assets` 或 mock URL。
- 将列表数据整理为 typed mock array。
- MVP 阶段只使用本地 mock，不引入 API 假设。
- 每实现一个页面，都先与 HTML 对照，再继续下一个页面。
