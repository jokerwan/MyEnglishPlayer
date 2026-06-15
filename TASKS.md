# TASKS

## 当前约束

仓库中尚未包含已确认的 HTML 高保真原型。不要开始实现页面，直到 HTML 已加入仓库并完成
`FRONTEND_MVP_BREAKDOWN.md` 中的页面和组件映射。

## Phase 0: 原型接入与拆解

- [ ] 将已确认的 HTML 原型文件加入仓库。
- [ ] 记录 HTML 中所有页面、弹窗和交互状态。
- [ ] 将每个 HTML 页面映射到一个 Expo Router 路由。
- [ ] 从 HTML 中抽取重复 UI 模式，更新组件清单。
- [ ] 将 HTML 中出现的静态展示数据整理为 typed mock 数据。
- [ ] 确认 MVP 中哪些交互只需要本地状态，不接后端。

## Phase 1: Expo + TypeScript 基础工程

- [ ] 初始化 Expo TypeScript 项目。
- [ ] 如存在多页面导航，接入 Expo Router。
- [ ] 配置严格 TypeScript 检查。
- [ ] 创建规划中的 `app/` 和 `src/` 目录结构。
- [ ] 根据 HTML 提取颜色、字体、间距、圆角等设计常量。
- [ ] 在 `src/data` 下创建 mock 数据文件。
- [ ] 在 `src/types` 下创建共享 TypeScript 类型。

## Phase 2: 通用 UI 组件

- [ ] 实现 `Screen`。
- [ ] 实现 `AppText`。
- [ ] 实现 `AppButton`。
- [ ] 实现 `AppIconButton`。
- [ ] 实现 `AppCard`。
- [ ] 实现 `ProgressBar`。
- [ ] 实现 `EmptyState`。
- [ ] 对照 HTML 验证通用组件视觉一致性。

## Phase 3: 第一个页面

- [ ] 等用户指定第一个要实现的页面。
- [ ] 只实现该页面及其必需组件。
- [ ] 只使用本地 mock 数据。
- [ ] 保持路由、文案、布局和产品逻辑与 HTML 一致。
- [ ] 在 Expo 中运行并检查页面。
- [ ] 完成后提交并推送，再进入下一个页面。

## Phase 4: 后续页面逐个实现

- [ ] 等用户逐页指定实现顺序。
- [ ] 优先复用已有通用组件。
- [ ] 仅当 HTML 出现新的可复用模式时新增组件。
- [ ] mock 数据保持 typed，并统一放在 `src/data`。
- [ ] 后端接入阶段开始前，不加入 API 假设。

## Phase 5: MVP 验证

- [ ] 运行 TypeScript 检查。
- [ ] 如已配置 lint，运行 lint。
- [ ] 运行 Expo App，检查导航和页面状态。
- [ ] 将每个已实现页面与 HTML 原型逐项对照。
- [ ] 如果原型存在歧义，先记录并确认，不擅自修改产品逻辑。
