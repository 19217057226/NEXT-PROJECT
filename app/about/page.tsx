'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Row,
  Col,
  Typography,
  Card,
  Tag,
  Space,
  Avatar,
  Statistic,
  Timeline,
  Breadcrumb,
  Button,
} from 'antd'
import {
  GithubOutlined,
  TwitterOutlined,
  MailOutlined,
  CodeOutlined,
  RocketOutlined,
  HeartOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { siteConfig } from '@/data/site-config'
import { posts, allTags, categories } from '@/data/mock-posts'

const { Title, Paragraph, Text } = Typography

const skills = [
  { name: 'React / Next.js', color: 'blue' },
  { name: 'TypeScript', color: 'geekblue' },
  { name: 'Node.js', color: 'green' },
  { name: 'Ant Design', color: 'cyan' },
  { name: 'PostgreSQL', color: 'purple' },
  { name: 'Docker', color: 'volcano' },
  { name: 'Redis', color: 'red' },
  { name: 'GraphQL', color: 'magenta' },
  { name: 'Tailwind CSS', color: 'cyan' },
  { name: 'Git', color: 'orange' },
  { name: 'Vite', color: 'gold' },
  { name: 'Linux', color: 'lime' },
] as const

const timelineItems = [
  {
    color: 'blue',
    children: (
      <div>
        <Text strong>2026 年</Text>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          开始维护 DevLog，分享多年技术积累，帮助更多开发者成长
        </Paragraph>
      </div>
    ),
  },
  {
    color: 'green',
    children: (
      <div>
        <Text strong>2024 年</Text>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          参与开源社区贡献，多个 PR 被 Next.js 和 Ant Design 合并
        </Paragraph>
      </div>
    ),
  },
  {
    color: 'purple',
    children: (
      <div>
        <Text strong>2022 年</Text>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          加入某互联网大厂担任高级前端工程师，主导多个核心项目架构设计
        </Paragraph>
      </div>
    ),
  },
  {
    color: 'orange',
    children: (
      <div>
        <Text strong>2020 年</Text>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          开始系统学习 TypeScript 和 React 生态，爱上了全栈开发
        </Paragraph>
      </div>
    ),
  },
  {
    color: 'gray',
    children: (
      <div>
        <Text strong>2018 年</Text>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          计算机专业毕业，第一份工作：前端开发工程师
        </Paragraph>
      </div>
    ),
  },
]

export default function AboutPage() {
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[{ title: <Link href="/">首页</Link> }, { title: '关于' }]}
      />

      {/* Hero Card */}
      <Card
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 24,
          border: '1px solid #f0f0f0',
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Banner */}
        <div
          style={{
            height: 200,
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #1677FF 100%)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              display: 'flex',
              gap: 8,
            }}
          >
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
              <Button
                icon={<GithubOutlined />}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff' }}
              >
                GitHub
              </Button>
            </a>
            <a href={`mailto:${siteConfig.socials.email}`}>
              <Button
                icon={<MailOutlined />}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff' }}
              >
                邮件
              </Button>
            </a>
          </div>
        </div>

        {/* Profile */}
        <div style={{ padding: '0 32px 32px', position: 'relative' }}>
          <Avatar
            src={siteConfig.author.avatar}
            size={96}
            style={{
              border: '4px solid #fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              marginTop: -48,
              display: 'block',
            }}
          />
          <Title level={3} style={{ marginBottom: 4, marginTop: 12 }}>
            {siteConfig.author.name}
          </Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontSize: 15 }}>
            全栈工程师 · 开源爱好者 · 博主
          </Text>
          <Paragraph style={{ fontSize: 15, lineHeight: 1.8, color: '#434343', maxWidth: 600 }}>
            {siteConfig.author.bio}
          </Paragraph>

          {/* Stats */}
          <Row gutter={[24, 12]} style={{ marginTop: 24 }}>
            <Col xs={8} sm={6}>
              <Statistic
                title="文章"
                value={posts.length}
                suffix="篇"
                prefix={<CodeOutlined style={{ color: '#1677FF' }} />}
              />
            </Col>
            <Col xs={8} sm={6}>
              <Statistic
                title="总阅读"
                value={Math.round(totalViews / 1000)}
                suffix="K"
                prefix={<HeartOutlined style={{ color: '#FF4D4F' }} />}
              />
            </Col>
            <Col xs={8} sm={6}>
              <Statistic
                title="标签"
                value={allTags.length}
                suffix="个"
                prefix={<RocketOutlined style={{ color: '#52C41A' }} />}
              />
            </Col>
            <Col xs={8} sm={6}>
              <Statistic
                title="分类"
                value={categories.length}
                suffix="个"
                prefix={<TrophyOutlined style={{ color: '#FAAD14' }} />}
              />
            </Col>
          </Row>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Skills */}
        <Col xs={24} md={14}>
          <Card
            title={
              <Space>
                <RocketOutlined style={{ color: '#1677FF' }} />
                <span>技术栈</span>
              </Space>
            }
            style={{ borderRadius: 16, border: '1px solid #f0f0f0', height: '100%' }}
            headStyle={{ borderBottom: '1px solid #f5f5f5' }}
          >
            <Space size={[10, 10]} wrap>
              {skills.map((skill) => (
                <Tag
                  key={skill.name}
                  color={skill.color}
                  style={{ borderRadius: 20, padding: '4px 14px', fontSize: 13 }}
                >
                  {skill.name}
                </Tag>
              ))}
            </Space>

            <div
              style={{
                marginTop: 24,
                padding: 20,
                background: '#F5F5F5',
                borderRadius: 12,
              }}
            >
              <Paragraph style={{ marginBottom: 0, color: '#595959', fontSize: 14, lineHeight: 1.8 }}>
                📚 目前在深入研究 <strong>React Server Components</strong>、
                <strong>边缘计算</strong> 以及 <strong>AI 辅助编程</strong> 在工程实践中的应用。如果你也对这些话题感兴趣，欢迎交流！
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Timeline */}
        <Col xs={24} md={10}>
          <Card
            title={
              <Space>
                <TrophyOutlined style={{ color: '#FAAD14' }} />
                <span>成长历程</span>
              </Space>
            }
            style={{ borderRadius: 16, border: '1px solid #f0f0f0' }}
            headStyle={{ borderBottom: '1px solid #f5f5f5' }}
          >
            <Timeline items={timelineItems} />
          </Card>
        </Col>

        {/* Blog Info */}
        <Col xs={24}>
          <Card
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #141414 0%, #1F1F1F 100%)',
              border: 'none',
            }}
            bodyStyle={{ padding: 36 }}
          >
            <Row align="middle" gutter={[32, 24]}>
              <Col xs={24} md={14}>
                <Title level={4} style={{ color: '#fff', marginBottom: 12 }}>
                  <CodeOutlined style={{ marginRight: 8, color: '#1677FF' }} />
                  关于 {siteConfig.name}
                </Title>
                <Paragraph style={{ color: '#8C8C8C', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                  {siteConfig.description}
                </Paragraph>
                <Space size={12}>
                  <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                    <Button icon={<GithubOutlined />} style={{ borderColor: '#434343', color: '#d9d9d9' }}>
                      GitHub
                    </Button>
                  </a>
                  <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer">
                    <Button icon={<TwitterOutlined />} style={{ borderColor: '#434343', color: '#d9d9d9' }}>
                      Twitter
                    </Button>
                  </a>
                  <a href={`mailto:${siteConfig.socials.email}`}>
                    <Button icon={<MailOutlined />} type="primary">
                      联系我
                    </Button>
                  </a>
                </Space>
              </Col>
              <Col xs={24} md={10}>
                <div
                  style={{
                    background: 'rgba(22,119,255,0.1)',
                    borderRadius: 12,
                    padding: 24,
                    border: '1px solid rgba(22,119,255,0.2)',
                  }}
                >
                  <Text style={{ color: '#8C8C8C', display: 'block', marginBottom: 12, fontSize: 13 }}>
                    本博客使用以下技术构建：
                  </Text>
                  <Space size={[8, 8]} wrap>
                    {['Next.js 14', 'TypeScript', 'Ant Design 5', 'App Router'].map((tech) => (
                      <Tag key={tech} color="blue" style={{ borderRadius: 4 }}>
                        {tech}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
