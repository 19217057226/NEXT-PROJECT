# 设计：手动暗夜模式 + 左侧栏

## 架构概览

```
┌─────────────┬────────────────────────────────────────┐
│  侧栏       │  可选：极薄顶栏（可选）                  │
│  （导航）   │  ─────────────────────────────────────  │
│             │                                        │
│  Logo       │            <main> 子内容               │
│  Menu       │                                        │
│             │                                        │
│  [主题]     │                                        │
└─────────────┴────────────────────────────────────────┘
```

- **根布局**（`app/layout.tsx`）：用 `next-themes` 的 `ThemeProvider` 包裹；在 `<html>` 上设置 `attribute="class"`，便于 Ant Design 与 CSS 根据 `.dark` 切换。
- **Ant Design**：`ConfigProvider` 的 `theme` 由 `theme.defaultAlgorithm` 或 `theme.darkAlgorithm` 与共享/自定义 token 组合（中性灰，主色可保留蓝色或略柔化）。
- **导航组件**：将当前 `Header.tsx` 顶栏替换为布局片段：
  - **`Layout`** + **`Sider`**（固定宽度，约 220–240px）+ **`Content`**（`flex: 1`）。
  - **`Menu`** 使用 `mode="inline"`；`selectedKeys` 来自 `usePathname()`。
  - **主题切换**：在侧栏底部或顶栏细条放置 `Button` 或 Ant `Switch` + 日月图标——调用 `next-themes` 的 `setTheme`。

## 手动暗夜模式

| 方面 | 选择 |
|------|------|
| 库 | `next-themes` |
| 持久化 | `localStorage`（内置） |
| 默认 | `light`（本变更关闭 `system`，仅手动） |
| `html` 类名 | 暗色模式下 `className` 含 `dark` |

**Ant Design 5**：`import { theme } from 'antd'`，向 `ConfigProvider` 传入 `algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm`。同步覆盖 `colorBgLayout`、`colorBorder`、`colorText` 等 token，使壳层一致。

**全局 CSS**：在 `:root` 与 `.dark` 上定义 `--bg-page`、`--bg-elevated`、`--border`、`--text` 等变量，并将 `body` 与 `globals.css` 中的关键工具类迁到变量。正文 `.post-content` 在 `.dark` 下需单独覆盖，避免灰阶不可读。

## 左侧栏「始终可见」

| 断点 | 行为 |
|------|------|
| **≥ md（约 768px+）** | 固定**展开**的 `Sider`，展示文字标签；除非另开任务，否则不做仅图标的折叠。 |
| **< md** | **始终可见的窄条**（约 56–64px）：图标 + `Tooltip` 展示标题，或细侧栏截断文字——导航不得仅藏在汉堡抽屉后。可选：导航项过多时用次要 `Drawer` 收纳（后续扩展）。 |

说明：小屏同时铺满文字标签会拥挤；**常驻图标条**可在满足「左侧栏始终展示」的同时避免回到「仅抽屉」模式。

## 灰白 + 以边框分面

- **浅色**：页面背景约 `#F5F5F5` 或 token；卡片/面板 `#FFFFFF` + `border: 1px solid` token；链接/激活态仍可用主色强调。
- **暗色**：采用 Ant 暗色算法默认值，并微调 `colorBorderSecondary` / `colorSplit`，使分隔线可见且克制。

## 预期改动文件

- `package.json` — 增加 `next-themes`。
- `app/layout.tsx` — `ThemeProvider`、动态 Ant 主题、带 `Sider` 的 `Layout` 重组。
- 新建或重构 `components/AppShell.tsx`，或将 `Header.tsx` 改为侧栏布局（客户端组件）。
- `app/globals.css` — CSS 变量 + `.dark` 覆盖。
- 关键页面（`app/page.tsx`、文章模板）— 仅在暗色明显破损时按需修改。

## 水合（Hydration）

- 按 `next-themes` 官方 Next.js 文档处理 `ThemeProvider`（客户端边界）。
- 必要时在 `<html>` 或 `<body>` 上使用 `suppressHydrationWarning`，减轻主题闪烁相关告警。

## 已决事项（实现阶段）

- **移动端**：常驻**图标条** + `Tooltip`（不以抽屉为唯一导航）。
- **本变更不同步系统主题**：切换纯手动（日后仍可再加 `defaultTheme="system"`）。
