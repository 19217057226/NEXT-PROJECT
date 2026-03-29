'use client'

import Link from 'next/link'
import { Layout, Row, Col, Typography, Space, Divider } from 'antd'
import { GithubOutlined, TwitterOutlined, MailOutlined, CodeOutlined } from '@ant-design/icons'
import { siteConfig } from '@/data/site-config'

const { Footer: AntFooter } = Layout
const { Text, Paragraph } = Typography

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <AntFooter
      style={{
        background: '#141414',
        padding: '48px 24px 24px',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[48, 32]}>
          {/* Brand */}
          <Col xs={24} sm={24} md={8}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
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
              <Text strong style={{ color: '#fff', fontSize: 18 }}>
                {siteConfig.name}
              </Text>
            </Link>
            <Paragraph style={{ color: '#8C8C8C', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              {siteConfig.description}
            </Paragraph>
            <Space size={12}>
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                <GithubOutlined style={{ color: '#8C8C8C', fontSize: 20, transition: 'color 0.2s' }} />
              </a>
              <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ color: '#8C8C8C', fontSize: 20 }} />
              </a>
              <a href={`mailto:${siteConfig.socials.email}`}>
                <MailOutlined style={{ color: '#8C8C8C', fontSize: 20 }} />
              </a>
            </Space>
          </Col>

          {/* Nav Links */}
          <Col xs={12} sm={8} md={4}>
            <Text strong style={{ color: '#fff', display: 'block', marginBottom: 16, fontSize: 14 }}>
              导航
            </Text>
            <Space direction="vertical" size={10}>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ color: '#8C8C8C', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                >
                  {item.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Topics */}
          <Col xs={12} sm={8} md={4}>
            <Text strong style={{ color: '#fff', display: 'block', marginBottom: 16, fontSize: 14 }}>
              话题
            </Text>
            <Space direction="vertical" size={10}>
              {['前端开发', '后端开发', 'TypeScript', 'CSS', 'DevOps'].map((topic) => (
                <Link
                  key={topic}
                  href={`/tags`}
                  style={{ color: '#8C8C8C', textDecoration: 'none', fontSize: 14 }}
                >
                  {topic}
                </Link>
              ))}
            </Space>
          </Col>

          {/* About */}
          <Col xs={24} sm={24} md={8}>
            <Text strong style={{ color: '#fff', display: 'block', marginBottom: 16, fontSize: 14 }}>
              关于作者
            </Text>
            <Paragraph style={{ color: '#8C8C8C', fontSize: 14, lineHeight: 1.7 }}>
              {siteConfig.author.bio}
            </Paragraph>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#2a2a2a', margin: '32px 0 16px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <Text style={{ color: '#595959', fontSize: 13 }}>
            © {year} {siteConfig.name}. Built with Next.js & Ant Design.
          </Text>
          <Text style={{ color: '#595959', fontSize: 13 }}>
            用 ❤️ 写给每一位开发者
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}
