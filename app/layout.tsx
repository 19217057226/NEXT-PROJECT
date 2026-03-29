import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, Layout } from 'antd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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

const theme = {
  token: {
    colorPrimary: '#1677FF',
    colorLink: '#1677FF',
    borderRadius: 8,
    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    colorBgBase: '#FFFFFF',
    colorTextBase: '#1F1F1F',
  },
  components: {
    Menu: {
      horizontalItemHoverColor: '#1677FF',
      itemSelectedColor: '#1677FF',
      itemHoverBg: 'transparent',
    },
    Card: {
      headerBg: '#FFFFFF',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', background: '#F5F5F5' }}>
              <Header />
              <main style={{ paddingTop: 64, flex: 1 }}>{children}</main>
              <Footer />
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
