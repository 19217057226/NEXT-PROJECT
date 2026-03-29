export const siteConfig = {
  name: 'DevLog',
  tagline: '探索技术的边界，记录成长的足迹',
  description: '一个专注于前端开发、Node.js 与工程实践的技术博客，由热爱代码的工程师写给工程师。',
  url: 'https://devlog.example.com',
  author: {
    name: '张明',
    bio: '全栈工程师，开源贡献者。专注于 React 生态、Node.js 性能优化和开发者体验提升。',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    email: 'hello@devlog.example.com',
  },
  socials: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    email: 'hello@devlog.example.com',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '分类', href: '/categories' },
    { label: '标签', href: '/tags' },
    { label: '关于', href: '/about' },
  ],
}

export type SiteConfig = typeof siteConfig
