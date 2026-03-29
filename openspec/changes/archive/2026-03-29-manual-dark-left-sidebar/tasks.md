# 任务清单：manual-dark-left-sidebar

## 依赖顺序

按顺序完成；完成后勾选复选框。

- [x] **1. 安装 `next-themes`**  
  添加依赖；核心行为不强制引入其他包。

- [x] **2. 客户端主题 Provider**  
  新增小型客户端组件（例如 `components/ThemeProvider.tsx`），封装 `next-themes` 的 `ThemeProvider`：`attribute="class"`、`defaultTheme="light"`、`enableSystem={false}`（仅手动），并设置 `storageKey` 以持久化。

- [x] **3. 根布局接线**  
  在 `app/layout.tsx` 中用新 Provider 包裹子树；按 Next.js + next-themes 说明调整 `<html>` / `<body>`（水合）。保持 `AntdRegistry` 与 `ConfigProvider` 在主题 Provider 内侧，以便 Ant 读取解析后的主题。

- [x] **4. Ant Design 暗色算法**  
  使 `ConfigProvider` 的 `theme` 随 `resolvedTheme`（客户端）变化：在 `theme.defaultAlgorithm` 与 `theme.darkAlgorithm` 间切换，并统一覆盖布局背景、边框、文字等 token。可考虑抽到 `lib/theme.ts`。

- [x] **5. 顶栏改为左侧壳层**  
  将导航改为 `components/AppShell.tsx`：`Layout` + `Sider` + 内联 `Menu`，数据来自 `siteConfig.nav`；移除旧 `Header` 与 `main` 的 `paddingTop: 64`。采用 flex 布局。

- [x] **6. 响应式「始终可见」侧栏**  
  `md` 及以上展示带标签的完整侧栏；`md` 以下展示窄图标条 + `Tooltip` 标题；在可行范围内保证点击区域 ≥ 44px。

- [x] **7. 手动主题切换 UI**  
  将切换控件放在侧栏底部（或 Logo 下方）。使用 Ant `Button` 或 `Switch` + 图标（如 `MoonOutlined` / `SunOutlined`）。绑定 `useTheme().setTheme('dark' | 'light')`。

- [x] **8. 全局 CSS 变量**  
  更新 `app/globals.css`：为 `:root` 与 `.dark` 定义 body 背景与文字等变量；更新 `.post-content` 与共用工具类，保证暗色可读。改动尽量小——优先壳层与最明显的问题。

- [x] **9. 移除过时的移动端抽屉**  
  若右侧导航 `Drawer` 在图标条 + Tooltip 下已冗余则删除；否则仅保留溢出/次要操作用途。

- [x] **10. 冒烟验证**  
  执行 `npm run build`；验证刷新后主题保持；验证导航 + 切换在桌面与移动端宽度下表现。（沙箱无 Node：`npm run build` 需在本地执行。）
