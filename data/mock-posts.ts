// ─── 类型定义 ────────────────────────────────────────────────
export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  readingTime: number // 分钟
  views: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  count: number
}

// ─── 作者数据 ────────────────────────────────────────────────
export const authors: Author[] = [
  {
    id: 'author-1',
    name: '张明',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: '全栈工程师，热爱开源，专注于 React / Next.js 生态。',
  },
  {
    id: 'author-2',
    name: '李晓颖',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    bio: '前端架构师，TailwindCSS 布道者，UX 设计爱好者。',
  },
]

// ─── 文章数据 ────────────────────────────────────────────────
export const posts: Post[] = [
  {
    id: 'post-1',
    title: 'Next.js 14 App Router 深度指南：从入门到生产',
    slug: 'nextjs-14-app-router-guide',
    excerpt:
      'App Router 是 Next.js 14 的核心变化，基于 React Server Components 构建，彻底改变了数据获取与布局嵌套的方式。本文带你从零理解这一范式转变。',
    content: `
## 什么是 App Router？

Next.js 14 引入的 **App Router** 是基于 React Server Components (RSC) 构建的全新路由系统，它与传统的 Pages Router 并存，但代表了框架未来的方向。

### 核心概念

**Server Components（服务端组件）**是 App Router 的基础。默认情况下，\`app/\` 目录下的所有组件都是 Server Components，这意味着：

- 可以直接 \`async/await\` 获取数据
- 不会将组件代码发送到客户端
- 可以直接访问服务端资源（数据库、文件系统等）

\`\`\`tsx
// app/posts/page.tsx - 这是一个 Server Component
async function PostsPage() {
  const posts = await fetchPosts() // 直接在服务端获取数据
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

**Client Components** 需要显式标记 \`'use client'\`，用于需要交互、浏览器 API 或 React 状态/副作用的场景。

### 布局嵌套

\`layout.tsx\` 文件定义共享 UI，在路由切换时**不会重新渲染**，天然支持持久化布局：

\`\`\`
app/
├── layout.tsx       ← 根布局（全局 Header/Footer）
├── page.tsx         ← 首页 /
└── blog/
    ├── layout.tsx   ← 博客子布局（侧边栏等）
    └── page.tsx     ← /blog
\`\`\`

### 数据获取新范式

忘掉 \`getServerSideProps\` 和 \`getStaticProps\`，App Router 中直接在组件内 \`fetch\`：

\`\`\`tsx
async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(\`https://api.example.com/posts/\${params.id}\`, {
    next: { revalidate: 3600 } // ISR：每小时重新验证
  })
  const post = await data.json()
  return <PostDetail post={post} />
}
\`\`\`

## 迁移建议

如果你有现有的 Pages Router 项目，可以**逐步迁移**——两套路由系统可以共存。建议从新功能开始使用 App Router，老页面暂时保留在 \`pages/\` 目录。

## 总结

App Router 代表了 React 全栈开发的未来方向。虽然学习曲线略陡，但一旦理解了 Server/Client Components 的边界，开发体验会显著提升。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-20T08:30:00Z',
    category: '前端开发',
    tags: ['Next.js', 'React', 'App Router', 'TypeScript'],
    readingTime: 8,
    views: 3421,
  },
  {
    id: 'post-2',
    title: 'Ant Design 5.x 主题定制：打造独一无二的设计系统',
    slug: 'antd-5-theme-customization',
    excerpt:
      'Ant Design 5.x 放弃了 Less，全面拥抱 CSS-in-JS 的 Design Token 方案。本文详解如何通过 ConfigProvider 实现企业级主题定制。',
    content: `
## Ant Design 5.x 主题系统概述

Ant Design 5.x 引入了全新的 **Design Token** 体系，通过 \`ConfigProvider\` 的 \`theme\` 属性进行配置，完全取代了 Less 变量方案。

### Token 分层体系

Ant Design 的 Token 分为三层：

1. **Seed Token（种子变量）**：最基础的设计决策，如主色 \`colorPrimary\`
2. **Map Token（映射变量）**：由 Seed Token 派生，如 \`colorPrimaryHover\`
3. **Alias Token（别名变量）**：具体组件使用的语义化 Token

### 基础主题配置

\`\`\`tsx
import { ConfigProvider } from 'antd'

export default function App({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677FF',  // 主题色
          borderRadius: 8,           // 圆角
          fontFamily: 'Noto Sans, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 20,  // 组件级覆盖
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
\`\`\`

### 暗色模式

Ant Design 5.x 内置暗色算法，切换极为简单：

\`\`\`tsx
import { theme } from 'antd'

<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
  {children}
</ConfigProvider>
\`\`\`

### 与 Next.js 集成

Next.js SSR 环境需要特殊处理 CSS-in-JS 的样式注入，使用官方包 \`@ant-design/nextjs-registry\`：

\`\`\`tsx
// app/layout.tsx
import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
\`\`\`

## 实战：定制企业风格主题

以下是一个完整的企业风格主题配置示例，包含主色、字体、间距的全面定制。通过合理的 Token 配置，可以让整个应用风格高度统一，减少手写 CSS 的需求。

总的来说，Ant Design 5.x 的主题系统更加灵活和强大，适合构建设计系统级别的应用。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    author: authors[1],
    publishedAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
    category: '前端开发',
    tags: ['Ant Design', 'CSS-in-JS', 'Design Token', '主题'],
    readingTime: 6,
    views: 2198,
  },
  {
    id: 'post-3',
    title: 'TypeScript 5.x 新特性全解析：装饰器、const 类型参数与更多',
    slug: 'typescript-5-new-features',
    excerpt:
      'TypeScript 5 带来了标准化装饰器、const 类型参数、枚举优化等重磅特性。本文逐一拆解这些变化对日常开发的影响。',
    content: `
## TypeScript 5.x 重要新特性

### 1. 标准化装饰器（Decorators）

TypeScript 5.0 实现了 TC39 Stage 3 的装饰器提案，这与之前的实验性装饰器有重大区别：

\`\`\`typescript
// 新的标准装饰器语法
function logMethod(target: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name)
  return function (this: any, ...args: any[]) {
    console.log(\`调用方法: \${methodName}\`)
    return target.call(this, ...args)
  }
}

class UserService {
  @logMethod
  getUser(id: string) {
    return { id, name: '张三' }
  }
}
\`\`\`

### 2. const 类型参数

\`\`\`typescript
// 之前：需要手动 as const
function identity<T>(value: T): T { return value }
const result = identity({ x: 10, y: 20 })
// result 类型是 { x: number, y: number }

// TypeScript 5.x：const 类型参数
function identity<const T>(value: T): T { return value }
const result = identity({ x: 10, y: 20 })
// result 类型是 { readonly x: 10, readonly y: 20 }
\`\`\`

### 3. 多配置文件扩展

\`\`\`json
{
  "extends": ["./base.json", "./strict.json"],
  "compilerOptions": {
    "outDir": "./dist"
  }
}
\`\`\`

### 4. \`--moduleResolution bundler\`

新增专为打包工具设计的模块解析策略，完美适配 Vite、esbuild 等现代构建工具的行为，避免 \`.js\` 扩展名相关的历史遗留问题。

## 迁移注意事项

升级到 TypeScript 5.x 时，需特别注意实验性装饰器与新标准装饰器的**不兼容性**。如果项目大量使用 \`experimentalDecorators\`（如 NestJS），建议暂缓升级或进行充分测试。

总体而言，TypeScript 5.x 是一次令人期待的大版本，类型系统更强大，性能也有显著提升。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: '2026-03-05T09:00:00Z',
    updatedAt: '2026-03-06T11:00:00Z',
    category: '编程语言',
    tags: ['TypeScript', '装饰器', '类型系统'],
    readingTime: 10,
    views: 4102,
  },
  {
    id: 'post-4',
    title: 'React Server Components 实战：重新思考数据获取边界',
    slug: 'react-server-components-in-practice',
    excerpt:
      'RSC 不只是一个性能优化技巧，它从根本上改变了我们思考组件边界的方式。本文通过实际案例，探讨 RSC 在生产环境中的最佳实践。',
    content: `
## RSC 的核心价值

React Server Components 解决了一个长期存在的问题：**组件需要数据，但数据获取逻辑应该在哪里？**

传统模式下，我们通常在页面级别获取所有数据，然后通过 props 逐层传递（prop drilling），或者使用全局状态管理（Redux/Zustand）。RSC 提供了第三条路——**让需要数据的组件直接获取数据**。

### 组件级数据获取

\`\`\`tsx
// UserProfile.tsx - Server Component
async function UserProfile({ userId }: { userId: string }) {
  // 直接在组件内获取数据，无需 useEffect 或 props 传递
  const user = await db.users.findById(userId)
  const posts = await db.posts.findByAuthor(userId)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  )
}
\`\`\`

### Server/Client 边界设计原则

**把 "use client" 尽量推向叶子节点。**

\`\`\`
Layout (Server) ─── 获取用户信息
  ├── Header (Server) ─── 显示导航
  │    └── ThemeToggle (Client) ← 需要交互，这里才加 'use client'
  ├── PostList (Server) ─── 获取文章列表
  │    └── PostCard (Server) ─── 渲染卡片
  │         └── LikeButton (Client) ← 需要点击交互
  └── Sidebar (Server)
\`\`\`

### 数据串行 vs 并行

\`\`\`tsx
// ❌ 串行请求（慢）
async function Page() {
  const user = await getUser()
  const posts = await getPosts(user.id) // 等待 user 后才请求
}

// ✅ 并行请求（快）
async function Page() {
  const [user, posts] = await Promise.all([getUser(), getPosts()])
}
\`\`\`

## 常见陷阱

1. **传递 Server Component 给 Client Component 的 children**：这是合法的，Client Component 可以渲染 Server Component 作为 children
2. **在 Server Component 中使用 useState/useEffect**：不允许，需要拆分为 Client Component
3. **序列化问题**：Server Component 传递给 Client Component 的 props 必须是可序列化的（不能是函数、类实例等）

RSC 是 React 最激动人心的进化，掌握它将使你在构建高性能 Web 应用时游刃有余。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop',
    author: authors[1],
    publishedAt: '2026-02-28T16:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
    category: '前端开发',
    tags: ['React', 'RSC', '性能优化', 'Next.js'],
    readingTime: 12,
    views: 5876,
  },
  {
    id: 'post-5',
    title: 'CSS Grid 布局进阶：实现复杂编辑器布局的完整方案',
    slug: 'css-grid-advanced-editor-layout',
    excerpt:
      '面板式 IDE 布局、仪表盘、杂志排版……CSS Grid 能优雅地解决这些复杂布局需求。本文深入讲解 subgrid、grid-template-areas 等高级特性。',
    content: `
## CSS Grid 高级布局技巧

### grid-template-areas：语义化布局

\`\`\`css
.editor-layout {
  display: grid;
  grid-template-areas:
    "toolbar  toolbar  toolbar"
    "sidebar  editor   preview"
    "status   status   status";
  grid-template-rows: 48px 1fr 24px;
  grid-template-columns: 240px 1fr 360px;
  height: 100vh;
}

.toolbar  { grid-area: toolbar; }
.sidebar  { grid-area: sidebar; }
.editor   { grid-area: editor; }
.preview  { grid-area: preview; }
.status   { grid-area: status; }
\`\`\`

这种写法让布局结构一目了然，修改时只需调整 \`grid-template-areas\` 字符串即可。

### Subgrid：嵌套网格对齐

Subgrid 解决了嵌套元素无法与父级网格对齐的痛点：

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-row: span 3;
  /* 继承父级列定义 */
  grid-template-rows: subgrid;
}
\`\`\`

### 响应式布局：auto-fill vs auto-fit

\`\`\`css
/* auto-fill: 尽量多放列，可能留空列 */
.gallery {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* auto-fit: 拉伸已有列填满容器 */
.gallery {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
\`\`\`

大多数响应式卡片布局使用 \`auto-fill\` 效果更好。

### 与 Flexbox 的分工

记住这个原则：
- **Flexbox**：一维布局（行 or 列），适合导航栏、工具栏、列表项
- **Grid**：二维布局（行 and 列），适合页面骨架、卡片网格、复杂表格

不要试图用一种替代另一种，组合使用才是正确姿势。

CSS Grid 已经被所有现代浏览器全面支持，大胆用起来吧！
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-20T11:00:00Z',
    category: 'CSS',
    tags: ['CSS', 'Grid', '布局', '响应式'],
    readingTime: 7,
    views: 1893,
  },
  {
    id: 'post-6',
    title: 'Node.js 性能调优：从火焰图到内存泄漏排查实战',
    slug: 'nodejs-performance-tuning',
    excerpt:
      'Node.js 服务出现性能问题时如何快速定位？本文介绍 clinic.js、0x、heapdump 等工具链，手把手带你读懂火焰图并排查内存泄漏。',
    content: `
## Node.js 性能问题排查工具箱

### 火焰图入门：用 0x 生成可交互火焰图

\`\`\`bash
npm install -g 0x
0x -- node server.js
# 压测完成后 Ctrl+C，自动生成 HTML 火焰图
\`\`\`

火焰图阅读技巧：
- **宽条块 = 热点函数**：宽度代表 CPU 时间占比
- **从下往上看**：下面是调用方，上面是被调用方
- **找到最宽的"平顶山"**：这就是性能瓶颈所在

### Clinic.js：一站式诊断工具

\`\`\`bash
npm install -g clinic

# Doctor：综合诊断（I/O 瓶颈、事件循环阻塞等）
clinic doctor -- node server.js

# Bubbleprof：异步操作可视化
clinic bubbleprof -- node server.js

# Flame：CPU 分析（集成 0x）
clinic flame -- node server.js
\`\`\`

### 内存泄漏排查

**第一步：确认有泄漏**

\`\`\`javascript
// 每 10 秒打印一次堆内存使用
setInterval(() => {
  const mem = process.memoryUsage()
  console.log(\`Heap Used: \${Math.round(mem.heapUsed / 1024 / 1024)} MB\`)
}, 10000)
\`\`\`

如果 Heap Used 持续增长不回落，说明有泄漏。

**第二步：生成堆快照对比**

\`\`\`javascript
const v8 = require('v8')
const fs = require('fs')

// 生成堆快照
function takeSnapshot(filename) {
  const snapshot = v8.writeHeapSnapshot(filename)
  console.log(\`Snapshot written to \${snapshot}\`)
}

takeSnapshot('./heap-before.heapsnapshot')
// ...操作一段时间后...
takeSnapshot('./heap-after.heapsnapshot')
\`\`\`

将两个快照文件导入 Chrome DevTools > Memory > Load，对比"比较视图"找出增量对象。

### 常见内存泄漏场景

1. **全局变量意外缓存**：未清理的 Map/Set/Array
2. **事件监听器未移除**：\`EventEmitter\` 绑定后忘记 \`removeListener\`
3. **定时器未清除**：\`setInterval\` 引用外部变量
4. **闭包持有大对象**：长生命周期闭包意外捕获了大数组/缓冲区

性能调优是一项系统工程，先测量再优化，避免过早优化。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: '2026-02-10T09:30:00Z',
    updatedAt: '2026-02-12T14:00:00Z',
    category: '后端开发',
    tags: ['Node.js', '性能优化', '内存泄漏', '监控'],
    readingTime: 15,
    views: 3267,
  },
  {
    id: 'post-7',
    title: 'Zustand vs Jotai：2026 年 React 状态管理的最优解',
    slug: 'zustand-vs-jotai-2026',
    excerpt:
      '随着 React 生态不断演进，Redux 的统治地位早已不再稳固。本文对比 Zustand 和 Jotai 的设计哲学，帮你在不同场景下做出正确选择。',
    content: `
## 状态管理的演进

从 Redux 的 Action/Reducer 模板代码，到 Context API 的性能陷阱，再到今天轻量高效的原子状态库，React 状态管理走过了漫长的道路。

### Zustand：简单但不简陋

Zustand 的设计哲学是**最小化 API，最大化灵活性**：

\`\`\`typescript
import { create } from 'zustand'

interface BlogStore {
  posts: Post[]
  currentPost: Post | null
  fetchPosts: () => Promise<void>
  setCurrentPost: (post: Post) => void
}

const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  currentPost: null,
  
  fetchPosts: async () => {
    const posts = await api.getPosts()
    set({ posts })
  },
  
  setCurrentPost: (post) => set({ currentPost: post }),
}))

// 组件中使用
function PostList() {
  const { posts, fetchPosts } = useBlogStore()
  useEffect(() => { fetchPosts() }, [])
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
\`\`\`

Zustand 适合：**中大型应用**，需要共享复杂状态、异步操作较多的场景。

### Jotai：原子化状态

Jotai 受 Recoil 启发，基于**原子（atom）**构建，状态天然解耦：

\`\`\`typescript
import { atom, useAtom } from 'jotai'

const postsAtom = atom<Post[]>([])
const searchTermAtom = atom('')
const filteredPostsAtom = atom((get) => {
  const posts = get(postsAtom)
  const term = get(searchTermAtom)
  return posts.filter(p => p.title.includes(term))
})

function SearchBar() {
  const [term, setTerm] = useAtom(searchTermAtom)
  return <input value={term} onChange={e => setTerm(e.target.value)} />
}

function PostList() {
  const [filteredPosts] = useAtom(filteredPostsAtom)
  return <ul>{filteredPosts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
\`\`\`

Jotai 适合：**组件级别的细粒度状态**，状态之间有复杂派生关系的场景。

### 选择建议

| 场景 | 推荐 |
|------|------|
| 全局业务状态（用户、购物车） | Zustand |
| UI 状态（主题、弹窗开关） | Jotai / useState |
| 复杂派生状态 | Jotai |
| 需要 DevTools 调试 | Zustand |
| 微前端、状态隔离 | Jotai |

如果项目已经用了 Zustand，没有明确理由就别换。选一个用好，比频繁切换更重要。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: authors[1],
    publishedAt: '2026-01-25T13:00:00Z',
    updatedAt: '2026-01-26T09:00:00Z',
    category: '前端开发',
    tags: ['React', 'Zustand', 'Jotai', '状态管理'],
    readingTime: 9,
    views: 6543,
  },
  {
    id: 'post-8',
    title: 'Docker Compose 实战：本地开发环境一键搭建',
    slug: 'docker-compose-local-dev',
    excerpt:
      '告别"在我电脑上能跑"的困境。本文演示如何用 Docker Compose 编排 Next.js + PostgreSQL + Redis 的完整开发环境，并实现热重载。',
    content: `
## 为什么用 Docker Compose 做开发环境？

Docker Compose 让整个团队使用**完全一致**的开发环境，消除环境差异导致的 bug，新人上手只需一条命令。

### 项目结构

\`\`\`
project/
├── docker-compose.yml
├── docker-compose.override.yml  ← 本地开发覆盖配置
├── Dockerfile
└── app/
\`\`\`

### docker-compose.yml

\`\`\`yaml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

### 开发环境热重载配置

\`\`\`yaml
# docker-compose.override.yml（本地开发专用，不提交到生产）
services:
  app:
    volumes:
      - .:/app            # 挂载源码实现热重载
      - /app/node_modules # 保留容器内的 node_modules
    command: npm run dev
    environment:
      NODE_ENV: development
\`\`\`

### 常用命令

\`\`\`bash
# 启动所有服务（后台运行）
docker compose up -d

# 查看日志
docker compose logs -f app

# 进入容器
docker compose exec app sh

# 停止并清理
docker compose down -v  # -v 同时删除数据卷
\`\`\`

### Dockerfile 多阶段构建

\`\`\`dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段（更小的镜像）
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["npm", "start"]
\`\`\`

Docker Compose 是现代全栈开发不可或缺的工具，投入学习时间绝对值得。
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    author: authors[0],
    publishedAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
    category: '后端开发',
    tags: ['Docker', 'DevOps', '开发环境', 'PostgreSQL'],
    readingTime: 11,
    views: 2789,
  },
]

// ─── 分类数据（从文章动态计算） ──────────────────────────────
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: '前端开发',
    slug: 'frontend',
    description: '探索现代前端技术栈，涵盖 React、Next.js、CSS 等',
    count: posts.filter((p) => p.category === '前端开发').length,
  },
  {
    id: 'cat-2',
    name: '后端开发',
    slug: 'backend',
    description: 'Node.js、数据库、API 设计与服务端架构',
    count: posts.filter((p) => p.category === '后端开发').length,
  },
  {
    id: 'cat-3',
    name: '编程语言',
    slug: 'languages',
    description: 'TypeScript、Rust、Go 等语言深度解析',
    count: posts.filter((p) => p.category === '编程语言').length,
  },
  {
    id: 'cat-4',
    name: 'CSS',
    slug: 'css',
    description: '现代 CSS 技巧与布局方案',
    count: posts.filter((p) => p.category === 'CSS').length,
  },
]

// ─── 所有标签（去重 + 计数）────────────────────────────────────
export const allTags: { name: string; count: number }[] = (() => {
  const tagMap: Record<string, number> = {}
  posts.forEach((p) => {
    p.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})()

// ─── 查询工具函数 ─────────────────────────────────────────────
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag))
}

export function getPaginatedPosts(
  page: number,
  pageSize: number,
  category?: string,
): { data: Post[]; total: number } {
  const filtered = category ? getPostsByCategory(category) : posts
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const start = (page - 1) * pageSize
  return {
    data: sorted.slice(start, start + pageSize),
    total: sorted.length,
  }
}
