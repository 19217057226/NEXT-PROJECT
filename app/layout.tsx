import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ThemeProvider from '@/components/ThemeProvider'
import AppShell from '@/components/AppShell'
import { siteConfig } from '@/data/site-config'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'TypeScript', 'React', '技术博客', '前端开发'],
  authors: [{ name: siteConfig.author.name }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AntdRegistry>
            <AppShell>{children}</AppShell>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
