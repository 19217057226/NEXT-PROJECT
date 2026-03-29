'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ConfigProvider, Layout, Menu, Button, Grid, Typography } from 'antd'
import {
  CodeOutlined,
  HomeOutlined,
  FolderOutlined,
  TagsOutlined,
  InfoCircleOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { siteConfig } from '@/data/site-config'
import Footer from '@/components/Footer'
import { getAntdTheme } from '@/lib/theme'

const { Sider, Content } = Layout
const { Text } = Typography

const NAV_ICONS: Record<string, ReactNode> = {
  '/': <HomeOutlined />,
  '/categories': <FolderOutlined />,
  '/tags': <TagsOutlined />,
  '/about': <InfoCircleOutlined />,
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const screens = Grid.useBreakpoint()
  const isMdUp = !!screens.md
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'
  const antdTheme = getAntdTheme(isDark)

  const selectedKey = siteConfig.nav.find((item) => item.href === pathname)?.href ?? '/'

  const menuItems = siteConfig.nav.map((item) => ({
    key: item.href,
    icon: NAV_ICONS[item.href] ?? <HomeOutlined />,
    title: item.label,
    label: (
      <Link href={item.href} style={{ textDecoration: 'none' }}>
        {item.label}
      </Link>
    ),
  }))

  const siderWidth = isMdUp ? 220 : 64

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: '100vh', background: isDark ? '#141414' : '#F0F0F0' }}>
        <Sider
          width={siderWidth}
          theme={isDark ? 'dark' : 'light'}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            height: '100vh',
            overflow: 'hidden',
            borderRight: `1px solid ${isDark ? '#303030' : '#E8E8E8'}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: '100vh',
            }}
          >
            <div
              style={{
                padding: isMdUp ? '16px 12px' : '12px 8px',
                borderBottom: `1px solid ${isDark ? '#303030' : '#F0F0F0'}`,
              }}
            >
              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: isMdUp ? 'flex-start' : 'center',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    background: 'linear-gradient(135deg, #1677FF, #4096FF)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CodeOutlined style={{ color: '#fff', fontSize: 16 }} />
                </div>
                {isMdUp ? (
                  <Text
                    strong
                    style={{ fontSize: 17, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {siteConfig.name}
                  </Text>
                ) : null}
              </Link>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                items={menuItems}
                inlineCollapsed={!isMdUp}
                inlineIndent={12}
                style={{
                  border: 'none',
                  background: 'transparent',
                  marginTop: 8,
                  paddingBottom: 8,
                }}
              />
            </div>

            <div
              style={{
                padding: isMdUp ? '12px 16px' : '8px',
                borderTop: `1px solid ${isDark ? '#303030' : '#F0F0F0'}`,
              }}
            >
            <Button
              type="text"
              block={isMdUp}
              icon={isDark ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={isDark ? '切换到亮色' : '切换到暗色'}
              style={{
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isMdUp ? (isDark ? '亮色模式' : '暗色模式') : null}
            </Button>
            </div>
          </div>
        </Sider>

        <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
          <Content style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
