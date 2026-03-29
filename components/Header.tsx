'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layout, Menu, Button, Drawer, Space, Typography } from 'antd'
import { MenuOutlined, CodeOutlined } from '@ant-design/icons'
import { siteConfig } from '@/data/site-config'

const { Header: AntHeader } = Layout
const { Text } = Typography

export default function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const selectedKey = siteConfig.nav.find((item) => item.href === pathname)?.href ?? '/'

  const menuItems = siteConfig.nav.map((item) => ({
    key: item.href,
    label: (
      <Link href={item.href} onClick={() => setDrawerOpen(false)}>
        {item.label}
      </Link>
    ),
  }))

  return (
    <>
      <AntHeader
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #1677FF, #4096FF)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CodeOutlined style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <Text
            strong
            style={{
              fontSize: 18,
              background: 'linear-gradient(135deg, #1677FF, #0958D9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            {siteConfig.name}
          </Text>
        </Link>

        {/* Desktop Nav */}
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{
            border: 'none',
            background: 'transparent',
            flex: 1,
            justifyContent: 'flex-end',
            minWidth: 0,
          }}
          className="hidden-mobile"
        />

        {/* Mobile hamburger */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          className="show-mobile"
          style={{ display: 'none' }}
        />
      </AntHeader>

      {/* Mobile Drawer */}
      <Drawer
        title={siteConfig.name}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={240}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                display: 'block',
                padding: '10px 16px',
                borderRadius: 8,
                color: pathname === item.href ? '#1677FF' : '#1F1F1F',
                background: pathname === item.href ? '#E6F4FF' : 'transparent',
                textDecoration: 'none',
                fontWeight: pathname === item.href ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </Space>
      </Drawer>
    </>
  )
}
