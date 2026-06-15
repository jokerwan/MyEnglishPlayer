# 前端 MVP 拆解说明

## 原型来源

- 文件：`english-listening-app-resource-detail-v52-resource-tree-study-toggle.html`
- 形态：单文件 HTML 高保真原型，使用 Tailwind + 自定义 CSS + 内联 JS 模拟页面切换
- 产品主题：薄荷绿 · 清新陪伴风
- 本阶段范围：只做前端 MVP 拆解，不接后端，不实现页面代码，不改产品逻辑

## 1. HTML 页面结构与组件结构分析

### 1.1 整体信息架构

原型采用「底部 Tab + 栈式页面 + 全局迷你播放器」结构：

```text
App Shell
├── 底部 Tab（4 个）
│   ├── 首页
│   ├── 听力库
│   ├── 单词本
│   └── 我的
├── 栈式页面（不在 Tab 中）
│   ├── 上传资源
│   ├── 我的资源
│   ├── 我的学习
│   └── 资源详情 / 精听页
├── 全局迷你播放器（music-player）
└── 全局 Toast
```

页面切换通过 `switchTab(tabName)` 控制 `.page-section.active`。底部导航只对应 4 个 Tab；`upload`、`resources`、`resource-detail`、`learning` 为栈式页面。

### 1.2 页面清单

| HTML ID | 页面名称 | 导航入口 | 是否显示底部播放器 |
| --- | --- | --- | --- |
| `page-home` | 首页 | Tab：首页 | 显示 |
| `page-listening` | 听力库 | Tab：听力库 | 显示 |
| `page-vocabulary` | 单词本 | Tab：单词本 | 显示 |
| `page-profile` | 我的 | Tab：我的 | 显示 |
| `page-upload` | 上传资源 | 首页快捷入口 / 我的资源上传按钮 | 隐藏 |
| `page-resources` | 我的资源 | 首页快捷入口 | 隐藏 |
| `page-learning` | 我的学习 | 首页「管理」/ 学习合集入口 | 隐藏 |
| `page-resource-detail` | 资源详情 / 精听页 | 资源项 / 播放器上拉 / 学习资源卡片 | 隐藏 |

### 1.3 子页面 / 弹层 / 状态

| 区域 | 说明 | 触发方式 |
| --- | --- | --- |
| `lm-dashboard` | 我的学习 - 合集列表 | 进入 `page-learning` 默认视图 |
| `lm-detail` | 我的学习 - 合集资源列表 | 点击合集卡片 |
| `detail-intensive-page` | 精听当前句全屏层 | 资源详情页点击「精听」 |
| `detail-info-sheet` | 资源详情底部弹层 | 资源详情页右上角「详情」 |
| `detail-info-notes` | 详情弹层 - 笔记 | 默认 Tab |
| `detail-info-words` | 详情弹层 - 生词 | Tab 切换 |
| `detail-info-stats` | 详情弹层 - 统计 | Tab 切换 |
| `resource-folder-dialog` | 文件夹重命名 / 新建弹窗 | 我的资源页操作 |
| `toast` | 全局提示 | 各类交互反馈 |

### 1.4 各页面组件结构

#### 首页 `page-home`

```text
HomeScreen
├── HomeHero
│   ├── HomeBubbleLayer
│   ├── HomeGreeting（动态问候 + 用户名）
│   ├── HomeMotivationText（动态激励文案）
│   └── StreakBadge（连续学习天数）
├── HomeStatsCard
│   ├── SectionHeader（本周学习状态）
│   └── MetricGrid
│       ├── MetricCard（有效听力）
│       ├── MetricCard（跟读复述）
│       └── MetricCard（词句积累）
├── HomeQuickActions
│   ├── QuickActionButton（上传）
│   ├── QuickActionButton（资源）
│   └── QuickActionButton（收藏）
└── HomeLearningList
    ├── SectionHeader + LinkButton（管理）
    └── LearningPlanCard[]
        ├── PlanCover
        ├── PlanInfo（标题 / 描述 / 进度）
        └── PlanPlayButton
```

#### 我的学习 `page-learning`

```text
LearningScreen
├── LearningNavBar（返回 + 标题）
└── LearningContent
    ├── LearningDashboard（lm-dashboard）
    │   ├── StatusSegment（正在学 / 已完成）
    │   ├── HintText
    │   ├── Toolbar（排序 / 选择）
    │   └── LearningPlanSwipeRow[]
    │       ├── SwipeAction（取消）
    │       ├── SelectDot
    │       └── LearningPlanCard
    └── LearningPlanDetail（lm-detail）
        ├── DetailHeader（资源列表 / 继续播放 / 排序）
        └── LearningResourceCard[]
```

#### 上传资源 `page-upload`

```text
UploadScreen
├── UploadNavBar
├── UploadMediaPanel（必填）
├── UploadNameInput（必填）
├── UploadSubtitlePanel（可选）
├── UploadMetaPanel
│   ├── DifficultyChipGroup（入门 / 适中 / 挑战）
│   └── CategoryChipGroup（儿童启蒙 / 日常对话 / 绘本故事 / 新闻慢速 / 自定义）
├── UploadFolderPanel
│   ├── FolderChoiceList
│   ├── NewFolderForm
│   └── FolderSummary
└── UploadBottomAction
    ├── PrimaryButton（完成上传）
    └── SuccessAction（上传完成 + 去我的资源查看）
```

#### 我的资源 `page-resources`

```text
ResourcesScreen
├── ResourceNavBar（返回 / 标题 / 上传）
├── ResourceSearchBar
├── ResourceFolderShelf
│   ├── FolderCard[]（横向滑动）
│   └── NewFolderForm
├── CurrentFolderStudyCard（加入学习 / 进度）
├── ResourceTypeFilter（全部 / 视频 / 音频 / 字幕）
├── ResourceListHeader（数量 / 排序 / 批量加入学习）
├── ResourceItem[]
└── ResourceEmptyState
```

#### 资源详情 / 精听页 `page-resource-detail`

```text
ResourceDetailScreen
├── ResourceDetailNavBar（返回 / 标题 / 详情）
├── VideoStagePanel
├── ResourceMetaRow（来源 / 时长 / 难度 / 字幕）
├── TranscriptList
│   └── TranscriptLine[]（时间 / 英文 / 中文 / 高亮态）
├── DetailToolbar
│   ├── ProgressRow（当前时间 / 进度条 / 总时长）
│   └── ControlBar（调速 / 跟读 / 精听 / 上一句 / 播放 / 下一句）
├── IntensiveListenOverlay（精听当前句）
└── ResourceInfoSheet（底部弹层）
    ├── InfoTabs（笔记 / 生词 / 统计）
    ├── NotesPane
    ├── WordsPane
    └── StatsPane（复听次数 / 跟读句 / 收藏词句 / 完成学习）
```

#### 听力库 `page-listening`

```text
ListeningLibraryScreen
├── GradientHeader（标题 / 搜索）
├── LevelFilterChips（全部 / 入门级 / 进阶级 / 精通级 / 考试类）
└── CourseCardGrid
    └── ListeningCourseCard[]（标题 / 课时 / 标签）
```

#### 单词本 `page-vocabulary`

```text
VocabularyScreen
├── GradientHeader（掌握数 / 今日待学 / 待复习 / 记忆率）
├── ModeTabs（学习模式 / 复习模式 / 测试模式）
└── WordStudyCard
    ├── WordHeader（进度 / 前后切换）
    ├── WordDetail（单词 / 音标 / 标签 / 释义 / 例句 / 搭配）
    └── WordActionButtons（忘记 / 有点印象 / 认识）
```

#### 我的 `page-profile`

```text
ProfileScreen
├── ProfileHeader
│   ├── Avatar
│   ├── UserName + LevelBadge
│   ├── StreakBadges
│   └── ProfileStatsRow（本周学习 / 掌握单词 / 平均正确率）
└── SettingsList
    └── SettingsRow[]（学习记录 / 成就徽章 / 学习计划 / 设置 / 关于我们）
```

#### 全局播放器 `app-footer`

```text
AppFooter
├── MiniPlayer
│   ├── PlayerCover
│   ├── PlayerMeta（标题 / 来源）
│   ├── PlayerControls（上一首 / 播放暂停 / 下一首）
│   └── PlayerProgress（时间 / 进度条）
└── BottomTabBar（首页 / 听力库 / 单词本 / 我的）
```

### 1.5 设计 Token（来自 HTML）

| Token | 值 |
| --- | --- |
| primary | `#14b8a6` |
| primary-light | `#2dd4bf` |
| secondary | `#10b981` / `#84cc16` |
| text-main | `#111827` |
| text-muted | `#64748b` |
| bg-soft | `#f8fafc` |
| line-soft | `#eef2f7` |
| 字体 | Inter, system-ui |
| 卡片阴影 | `0 12px 30px rgba(15, 23, 42, .055)` |

## 2. React Native 项目目录

```text
.
├── app/
│   ├── _layout.tsx                      # 根布局：主题、Toast、全局 MiniPlayer
│   ├── (tabs)/
│   │   ├── _layout.tsx                  # 底部 Tab 导航
│   │   ├── index.tsx                    # 首页 -> page-home
│   │   ├── listening.tsx                # 听力库 -> page-listening
│   │   ├── vocabulary.tsx               # 单词本 -> page-vocabulary
│   │   └── profile.tsx                  # 我的 -> page-profile
│   ├── upload.tsx                       # 上传资源 -> page-upload
│   ├── resources/
│   │   └── index.tsx                    # 我的资源 -> page-resources
│   ├── learning/
│   │   ├── index.tsx                    # 我的学习 dashboard -> lm-dashboard
│   │   └── [planId].tsx                 # 合集资源列表 -> lm-detail
│   ├── resource/
│   │   └── [resourceId].tsx             # 资源详情 / 精听 -> page-resource-detail
│   └── modal/
│       ├── intensive-listen.tsx           # 精听当前句 -> detail-intensive-page
│       └── resource-info.tsx              # 资源详情弹层 -> detail-info-sheet
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── audio/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Screen.tsx
│   │   │   ├── AppText.tsx
│   │   │   ├── AppButton.tsx
│   │   │   ├── AppIconButton.tsx
│   │   │   ├── AppCard.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── SegmentedControl.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── GradientHeader.tsx
│   │   ├── navigation/
│   │   │   ├── BottomTabBar.tsx
│   │   │   ├── StackNavBar.tsx
│   │   │   └── MiniPlayer.tsx
│   │   ├── home/
│   │   │   ├── HomeHero.tsx
│   │   │   ├── HomeStatsCard.tsx
│   │   │   ├── HomeQuickActions.tsx
│   │   │   └── HomeLearningPlanCard.tsx
│   │   ├── learning/
│   │   │   ├── LearningStatusSegment.tsx
│   │   │   ├── LearningToolbar.tsx
│   │   │   ├── LearningPlanSwipeRow.tsx
│   │   │   ├── LearningPlanCard.tsx
│   │   │   └── LearningResourceCard.tsx
│   │   ├── upload/
│   │   │   ├── UploadFileCard.tsx
│   │   │   ├── UploadChoiceGroup.tsx
│   │   │   ├── UploadFolderPicker.tsx
│   │   │   └── UploadBottomAction.tsx
│   │   ├── resources/
│   │   │   ├── ResourceFolderCard.tsx
│   │   │   ├── ResourceFolderStudyCard.tsx
│   │   │   ├── ResourceTypeFilter.tsx
│   │   │   ├── ResourceListItem.tsx
│   │   │   └── ResourceFolderDialog.tsx
│   │   ├── resource-detail/
│   │   │   ├── ResourceVideoStage.tsx
│   │   │   ├── ResourceMetaRow.tsx
│   │   │   ├── TranscriptLine.tsx
│   │   │   ├── TranscriptList.tsx
│   │   │   ├── DetailToolbar.tsx
│   │   │   ├── DetailControlButton.tsx
│   │   │   ├── IntensiveListenOverlay.tsx
│   │   │   ├── ResourceInfoSheet.tsx
│   │   │   ├── ResourceNotesPane.tsx
│   │   │   ├── ResourceWordsPane.tsx
│   │   │   └── ResourceStatsPane.tsx
│   │   ├── listening/
│   │   │   ├── ListeningFilterChips.tsx
│   │   │   └── ListeningCourseCard.tsx
│   │   ├── vocabulary/
│   │   │   ├── VocabularyModeTabs.tsx
│   │   │   ├── WordStudyCard.tsx
│   │   │   ├── WordDetailPanel.tsx
│   │   │   └── WordActionBar.tsx
│   │   └── profile/
│   │       ├── ProfileHeader.tsx
│   │       ├── ProfileStatsRow.tsx
│   │       └── SettingsRow.tsx
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── layout.ts
│   │   └── typography.ts
│   ├── data/
│   │   ├── mockUser.ts
│   │   ├── mockHome.ts
│   │   ├── mockStudyPlans.ts
│   │   ├── mockFolders.ts
│   │   ├── mockResources.ts
│   │   ├── mockTranscripts.ts
│   │   ├── mockListeningCourses.ts
│   │   ├── mockVocabulary.ts
│   │   └── mockPlayer.ts
│   ├── hooks/
│   │   ├── useMockPlayer.ts
│   │   ├── useGreeting.ts
│   │   └── useToast.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── home.ts
│   │   ├── studyPlan.ts
│   │   ├── folder.ts
│   │   ├── resource.ts
│   │   ├── transcript.ts
│   │   ├── listening.ts
│   │   ├── vocabulary.ts
│   │   └── player.ts
│   └── utils/
│       ├── formatDuration.ts
│       ├── coverCode.ts
│       └── mockSelectors.ts
├── english-listening-app-resource-detail-v52-resource-tree-study-toggle.html
├── TASKS.md
├── package.json
├── tsconfig.json
└── app.json
```

## 3. 需要创建的组件清单

### 3.1 通用组件（优先实现）

| 组件 | 对应 HTML | 说明 |
| --- | --- | --- |
| `Screen` | 各页面外层 | 安全区、背景色、滚动容器 |
| `AppText` | 全局文本 | 标题、正文、辅助文字 variant |
| `AppButton` | 各类按钮 | 主按钮、次按钮、文本按钮 |
| `AppIconButton` | 返回、播放、更多 | 图标按钮 |
| `AppCard` | 白底圆角卡片 | 阴影、圆角统一 |
| `Chip` | `upload-choice` / 筛选标签 | 单选 chip |
| `ProgressBar` | 各类进度条 | 课程进度、播放进度 |
| `SegmentedControl` | `lm-segment` / 模式切换 | 双段或多段筛选 |
| `SearchBar` | 搜索输入框 | 资源页、听力库 |
| `EmptyState` | `resource-empty` | 空列表状态 |
| `Toast` | `#toast` | 全局提示 |
| `GradientHeader` | `top-gradient` / `home-hero` | 顶部渐变头部 |

### 3.2 导航与播放器

| 组件 | 对应 HTML | 说明 |
| --- | --- | --- |
| `BottomTabBar` | `.bottom-nav` | 4 Tab 底部导航 |
| `StackNavBar` | 各页 header | 返回 + 标题 + 右侧操作 |
| `MiniPlayer` | `.music-player` | 全局迷你播放器 |

### 3.3 首页

| 组件 | 说明 |
| --- | --- |
| `HomeHero` | 问候、激励文案、连续学习徽章 |
| `HomeStatsCard` | 本周三项指标 |
| `HomeQuickActions` | 上传 / 资源 / 收藏 |
| `HomeLearningPlanCard` | 我的学习列表卡片 |

### 3.4 我的学习

| 组件 | 说明 |
| --- | --- |
| `LearningStatusSegment` | 正在学 / 已完成 |
| `LearningToolbar` | 排序、选择模式 |
| `LearningPlanSwipeRow` | 左滑取消 + 选择点 |
| `LearningPlanCard` | 合集卡片 |
| `LearningResourceCard` | 合集内资源卡片 |

### 3.5 上传 / 我的资源

| 组件 | 说明 |
| --- | --- |
| `UploadFileCard` | 选择音视频 / 字幕文件 |
| `UploadChoiceGroup` | 难度、类别选择 |
| `UploadFolderPicker` | 保存文件夹选择 |
| `UploadBottomAction` | 完成上传 / 成功态 |
| `ResourceFolderCard` | 文件夹横向卡片 |
| `ResourceFolderStudyCard` | 当前文件夹学习状态 |
| `ResourceTypeFilter` | 全部 / 视频 / 音频 / 字幕 |
| `ResourceListItem` | 资源列表项 |
| `ResourceFolderDialog` | 新建 / 重命名文件夹弹窗 |

### 3.6 资源详情 / 精听

| 组件 | 说明 |
| --- | --- |
| `ResourceVideoStage` | 视频播放占位区 |
| `ResourceMetaRow` | 来源、时长、难度、字幕 |
| `TranscriptLine` | 单句字幕（英 / 中 / 时间 / 高亮） |
| `TranscriptList` | 字幕列表 |
| `DetailToolbar` | 底部播放与学习控制区 |
| `DetailControlButton` | 调速 / 跟读 / 精听等按钮 |
| `IntensiveListenOverlay` | 精听当前句全屏层 |
| `ResourceInfoSheet` | 详情底部弹层 |
| `ResourceNotesPane` | 笔记输入 |
| `ResourceWordsPane` | 生词 chips |
| `ResourceStatsPane` | 学习统计 + 完成学习 |

### 3.7 听力库 / 单词本 / 我的

| 组件 | 说明 |
| --- | --- |
| `ListeningFilterChips` | 等级筛选 |
| `ListeningCourseCard` | 课程卡片 |
| `VocabularyModeTabs` | 学习 / 复习 / 测试 |
| `WordStudyCard` | 单词学习主卡片 |
| `WordDetailPanel` | 单词详情 |
| `WordActionBar` | 忘记 / 有点印象 / 认识 |
| `ProfileHeader` | 头像、等级、连续学习 |
| `ProfileStatsRow` | 三项统计 |
| `SettingsRow` | 设置列表项 |

## 4. Mock 数据结构

以下结构直接对应 HTML 原型中的 JS 数据与 DOM 字段，MVP 阶段全部使用本地 mock。

### 4.1 UserProfile

```ts
type UserProfile = {
  id: string;
  name: string;                 // joker
  avatarUrl?: string;
  level: number;                // 5
  levelTitle: string;           // 学习达人
  streakDays: number;           // 7
  totalStudyDays: number;       // 36
  weeklyStudyHours: number;     // 3.5
  masteredWordCount: number;    // 128
  averageAccuracy: number;      // 85
};
```

### 4.2 HomeStats

```ts
type HomeStats = {
  trendLabel: string;           // 稳定提升
  effectiveListening: {
    value: string;              // 3.5h
    delta: string;              // 较上周 +1.2h
  };
  shadowingSentences: {
    value: string;              // 18句
    delta: string;              // 本周新增 +6句
  };
  phraseCollection: {
    value: string;              // 12个
    delta: string;              // 较上周 +10个
  };
};
```

### 4.3 StudyPlan（对应 `plans`）

```ts
type StudyPlanStatus = 'learning' | 'done';

type StudyPlanResource = {
  id: string;
  title: string;
  meta: string;
  progress: number;
  updatedAt: string;
  done: boolean;
  cover: string;
};

type StudyPlan = {
  id: string;
  title: string;
  cover: string;
  coverClass: string;
  status: StudyPlanStatus;
  progress: number;
  meta: string;
  updatedAt: string;
  resources: StudyPlanResource[];
};
```

### 4.4 ResourceFolder

```ts
type ResourceFolder = {
  id: string;
  name: string;
  icon: string;
  resourceCount: number;
  studyStatus: 'added' | 'none';
  progressPercent: number;
};
```

### 4.5 ResourceItem（我的资源 / 播放器 / 详情共用）

```ts
type ResourceType = 'audio' | 'video' | 'subtitle';
type ResourceStudyStatus = 'none' | 'learning' | 'done';
type ResourceLevel = '初级' | '中级' | '高级';

type ResourceItem = {
  id: string;
  title: string;
  folder: string;
  type: ResourceType;
  duration: string;               // 04:12
  durationSeconds?: number;
  level: ResourceLevel;
  hasSubtitle: boolean;
  tag: string;
  studyStatus: ResourceStudyStatus;
  progress: number;
  cover: string;
};
```

### 4.6 TranscriptPack（资源详情字幕）

```ts
type TranscriptLine = {
  time: string;                   // 00:36
  en: string;
  zh: string;
};

type KeywordChip = {
  en: string;
  zh: string;
};

type TranscriptPack = {
  lines: TranscriptLine[];
  words: KeywordChip[];
};
```

### 4.7 ResourceStudyStats（详情统计）

```ts
type ResourceStudyStats = {
  listenCount: number;            // 复听次数
  shadowCount: number;            // 跟读句
  savedPhraseCount: number;       // 收藏词句
  note?: string;
};
```

### 4.8 UploadDraft（上传页本地状态）

```ts
type UploadDifficulty = '入门' | '适中' | '挑战';
type UploadCategory =
  | '儿童启蒙'
  | '日常对话'
  | '绘本故事'
  | '新闻慢速'
  | '自定义';

type UploadDraft = {
  mediaSelected: boolean;
  mediaFileName?: string;
  subtitleSelected: boolean;
  subtitleFileName?: string;
  name: string;
  difficulty: UploadDifficulty;
  category: UploadCategory;
  folderName: string;
};
```

### 4.9 ListeningCourse（听力库）

```ts
type ListeningCourse = {
  id: string;
  title: string;
  lessonCount: number;
  lessonDurationMinutes: number;
  levelTag: string;
  badgeText: string;
  badgeColor: 'green' | 'blue' | 'purple' | 'amber';
};
```

### 4.10 VocabularyWord（单词本）

```ts
type VocabularyWord = {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  tags: string[];
  meaning: string;
  exampleEn: string;
  exampleZh: string;
  collocations: { en: string; zh: string }[];
};

type VocabularySession = {
  mode: 'study' | 'review' | 'test';
  currentIndex: number;
  totalToday: number;
  pendingReview: number;
  memoryRate: number;
};
```

### 4.11 PlayerState（全局迷你播放器）

```ts
type PlayerState = {
  title: string;
  subtitle: string;               // 来自：日常对话练习
  folder: string;
  cover: string;
  durationSeconds: number;
  currentTimeSeconds: number;
  isPlaying: boolean;
  progressPercent: number;
  speed: 0.75 | 1 | 1.25 | 1.5 | 2;
  resourceId?: string;
};
```

### 4.12 SettingsItem（我的页）

```ts
type SettingsItem = {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
};
```

## 5. 页面到路由映射

| HTML 页面 | Expo Router 路由 | 备注 |
| --- | --- | --- |
| `page-home` | `/(tabs)/index` | 默认 Tab |
| `page-listening` | `/(tabs)/listening` | Tab |
| `page-vocabulary` | `/(tabs)/vocabulary` | Tab |
| `page-profile` | `/(tabs)/profile` | Tab |
| `page-upload` | `/upload` | 栈页面，隐藏 MiniPlayer |
| `page-resources` | `/resources` | 栈页面，隐藏 MiniPlayer |
| `page-learning` | `/learning` | dashboard |
| `lm-detail` | `/learning/[planId]` | 合集资源列表 |
| `page-resource-detail` | `/resource/[resourceId]` | 精听页 |
| `detail-intensive-page` | `/modal/intensive-listen` 或页面内 Modal | 精听当前句 |
| `detail-info-sheet` | `/modal/resource-info` 或 BottomSheet | 资源详情弹层 |

## 6. MVP 实现原则

- 严格按 HTML 页面逐个实现，不一次性开发完整 App
- 每个页面只依赖自己已经实现的通用组件和 mock 数据
- 播放器、上传、加入学习、完成学习等交互先用本地状态模拟
- 不在 MVP 阶段引入后端 API
- 产品文案、页面层级、按钮名称以 HTML 为准，不做重新设计
