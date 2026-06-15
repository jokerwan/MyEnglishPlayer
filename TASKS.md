# TASKS

## 当前状态

- HTML 原型已接入：`english-listening-app-resource-detail-v52-resource-tree-study-toggle.html`
- 页面与组件拆解见：`FRONTEND_MVP_BREAKDOWN.md`
- 已完成首页实现：`app/(tabs)/index.tsx`
- 已完成上传页实现：`app/upload.tsx`
- 已完成我的资源页实现：`app/resources/index.tsx`
- 其他页面等待逐页实现

## Phase 0: 原型拆解（已完成）

- [x] 接入 HTML 高保真原型
- [x] 梳理 8 个主页面 + 子视图 + 弹层
- [x] 输出 Expo 项目目录
- [x] 输出组件清单
- [x] 输出 mock 数据结构
- [x] 输出页面到路由映射

## Phase 1: Expo + TypeScript 基础工程

- [x] 初始化 Expo TypeScript 项目
- [x] 接入 Expo Router
- [x] 配置 `tsconfig.json` 严格模式
- [x] 创建 `app/` 与 `src/` 目录骨架
- [x] 从 HTML 提取设计 Token 到 `src/constants`
- [x] 创建 `src/types` 共享类型
- [x] 创建 `src/data` mock 数据文件
- [x] 实现 `useToast`、`useGreeting`、全局 Player 基础 hooks

## Phase 2: 通用基础组件

- [ ] `Screen`
- [ ] `AppButton`
- [ ] `AppIconButton`
- [ ] `AppCard`
- [ ] `Chip`
- [ ] `SegmentedControl`
- [x] `SearchBar`（资源页 `ResourceSearchBar`）
- [x] `EmptyState`（资源页 `ResourceEmptyState`）
- [ ] `GradientHeader`
- [x] `StackNavBar`
- [x] `AppText`
- [x] `ProgressBar`
- [x] `Toast`
- [x] `BottomTabBar`
- [x] `MiniPlayer`

## Phase 3: Tab 页面（按用户指定顺序逐个实现）

### 3.1 首页 `page-home`

- [x] 路由：`/(tabs)/index`
- [x] `HomeHero`
- [x] `HomeStatsCard`
- [x] `HomeQuickActions`
- [x] `HomeLearningPlanCard` / `HomeLearningList`
- [x] 接入 `mockHome.ts`、`mockStudyPlans.ts`
- [x] 跳转：上传 / 我的资源 / 我的学习（目标页暂为占位）
- [x] 播放按钮联动全局 MiniPlayer + Toast

### 3.2 听力库 `page-listening`

- [ ] 路由：`/(tabs)/listening`
- [ ] `ListeningFilterChips`
- [ ] `ListeningCourseCard`
- [ ] 接入 `mockListeningCourses.ts`
- [ ] 点击课程更新全局 MiniPlayer

### 3.3 单词本 `page-vocabulary`

- [ ] 路由：`/(tabs)/vocabulary`
- [ ] `VocabularyModeTabs`
- [ ] `WordStudyCard`
- [ ] `WordDetailPanel`
- [ ] `WordActionBar`
- [ ] 接入 `mockVocabulary.ts`

### 3.4 我的 `page-profile`

- [ ] 路由：`/(tabs)/profile`
- [ ] `ProfileHeader`
- [ ] `ProfileStatsRow`
- [ ] `SettingsRow`
- [ ] 接入 `mockUser.ts`

## Phase 4: 栈式页面（按用户指定顺序逐个实现）

### 4.1 上传资源 `page-upload`

- [x] 路由：`/upload`
- [x] `UploadFileCard`
- [x] `UploadChoiceGroup`
- [x] `UploadFolderPicker`
- [x] `UploadBottomAction`
- [x] `StackNavBar`
- [x] 本地校验：音视频必选、名称必填
- [x] 上传成功态与跳转「我的资源」

### 4.2 我的资源 `page-resources`

- [x] 路由：`/resources`
- [x] `ResourceNavBar`
- [x] `ResourceSearchBar`
- [x] `ResourceFolderCard` / `ResourceFolderSection`
- [x] `ResourceFolderStudyCard`
- [x] `ResourceTypeFilterRow`
- [x] `ResourceListItem`
- [x] `ResourceListHeader`
- [x] `ResourceEmptyState`
- [x] 搜索、筛选、加入学习本地逻辑

### 4.3 我的学习 `page-learning`

- [ ] 路由：`/learning`
- [ ] `LearningStatusSegment`
- [ ] `LearningToolbar`
- [ ] `LearningPlanSwipeRow`
- [ ] `LearningPlanCard`
- [ ] dashboard 视图：`lm-dashboard`
- [ ] 详情视图：`/learning/[planId]`
- [ ] `LearningResourceCard`
- [ ] 左滑取消、选择模式、排序本地逻辑

### 4.4 资源详情 / 精听页 `page-resource-detail`

- [ ] 路由：`/resource/[resourceId]`
- [ ] `ResourceVideoStage`
- [ ] `ResourceMetaRow`
- [ ] `TranscriptList` / `TranscriptLine`
- [ ] `DetailToolbar` / `DetailControlButton`
- [ ] `IntensiveListenOverlay`
- [ ] `ResourceInfoSheet`
- [ ] `ResourceNotesPane` / `ResourceWordsPane` / `ResourceStatsPane`
- [ ] 调速、句级切换、精听、跟读、完成学习本地逻辑

## Phase 5: 全局能力串联

- [x] 根布局挂载 `MiniPlayer` + `BottomTabBar`
- [ ] 在 upload / resources / resource-detail 页面隐藏 MiniPlayer
- [x] 首页播放按钮与播放器状态联动
- [ ] 资源详情与全局播放器双向同步标题、进度、播放态
- [x] Toast 全局复用

## Phase 6: MVP 验证

- [x] TypeScript 检查通过
- [ ] Expo 运行通过
- [ ] 4 个 Tab 可切换
- [ ] 栈式页面可进入并可返回
- [ ] 每个已实现页面与 HTML 原型逐项对照
- [ ] 不擅自修改产品文案与交互逻辑

## 推荐实现顺序（待你确认）

1. Phase 1 基础工程
2. Phase 2 通用组件
3. 首页
4. 资源详情 / 精听页
5. 我的资源
6. 我的学习
7. 上传资源
8. 听力库
9. 单词本
10. 我的

> 实际开发时以你指定的页面顺序为准，每次只实现一个页面及其必需组件。
