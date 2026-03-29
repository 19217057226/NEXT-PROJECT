'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Avatar,
  Button,
  Divider,
  Breadcrumb,
  Spin,
  Result,
  Card,
} from 'antd'
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  UserOutlined,
  TagsOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import Sidebar from '@/components/Sidebar'
import { getPostBySlug, posts as allPosts } from '@/data/mock-posts'
import { formatDate, getTagColor, formatReadingTime, formatViews } from '@/lib/utils'

const { Title, Text, Paragraph } = Typography

/**
 * 将简单的 Markdown 转换为 HTML（仅支持博客正文常用语法）
 */
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, _lang: string, code: string) => {
      const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code>${escaped}</code></pre>`
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\| (.+) \|$/gm, (line: string) => {
      const cells = line
        .slice(2, -2)
        .split(' | ')
        .map((c: string) => `<td>${c}</td>`)
        .join('')
      return `<tr>${cells}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n)+/g, (rows: string) => `<table>${rows}</table>`)
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (items: string) => `<ul>${items}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|t|p|l|c|b|d])(.+)$/gm, (line: string) => {
      if (line.startsWith('<') || line.trim() === '') return line
      return line
    })
    .replace(/^(<p>)?(.+?)(<\/p>)?$/gm, (line: string) => {
      if (
        line.startsWith('<h') ||
        line.startsWith('<ul') ||
        line.startsWith('<ol') ||
        line.startsWith('<table') ||
        line.startsWith('<pre') ||
        line.startsWith('<li') ||
        line.startsWith('<tr') ||
        line.trim() === ''
      )
        return line
      return line
    })
}

export default function PostDetailPage() {
  const params = useParams()
  const slug = params?.id as string
  const post = getPostBySlug(slug)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ textAlign: 'center', padding: 120 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
        <Result
          status="404"
          title="文章不存在"
          subTitle="抱歉，该文章不存在或已被删除。"
          extra={
            <Link href="/">
              <Button type="primary" icon={<ArrowLeftOutlined />}>
                返回首页
              </Button>
            </Link>
          }
        />
      </div>
    )
  }

  const htmlContent = simpleMarkdownToHtml(post.content)

  // 相关文章（同分类，排除当前）
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: <Link href="/">首页</Link> },
          { title: <Link href="/categories">{post.category}</Link> },
          { title: post.title },
        ]}
      />

      <Row gutter={[24, 0]}>
        {/* Article */}
        <Col xs={24} lg={17}>
          <Card
            style={{ borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden' }}
            bodyStyle={{ padding: 0 }}
          >
            {/* Cover Image */}
            <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 24, left: 32, right: 32 }}>
                <Space size={8} style={{ marginBottom: 12 }}>
                  <Tag
                    icon={<FolderOutlined />}
                    color="blue"
                    style={{ borderRadius: 20, fontWeight: 500 }}
                  >
                    {post.category}
                  </Tag>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Tag
                      key={tag}
                      color={getTagColor(tag)}
                      style={{ borderRadius: 20, fontSize: 11 }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
                <Title
                  level={2}
                  style={{
                    color: '#fff',
                    marginBottom: 0,
                    fontSize: 24,
                    lineHeight: 1.4,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {post.title}
                </Title>
              </div>
            </div>

            {/* Meta */}
            <div
              style={{
                padding: '20px 32px',
                borderBottom: '1px solid #f5f5f5',
                background: '#FAFAFA',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                {/* Author */}
                <Space size={10}>
                  <Avatar
                    src={post.author.avatar}
                    size={40}
                    icon={<UserOutlined />}
                    style={{ border: '2px solid #E6F4FF' }}
                  />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 14 }}>
                      {post.author.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {post.author.bio.slice(0, 30)}...
                    </Text>
                  </div>
                </Space>

                {/* Stats */}
                <Space size={16}>
                  <Space size={4}>
                    <CalendarOutlined style={{ color: '#8C8C8C' }} />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {formatDate(post.publishedAt)}
                    </Text>
                  </Space>
                  <Space size={4}>
                    <ClockCircleOutlined style={{ color: '#8C8C8C' }} />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {formatReadingTime(post.readingTime)}
                    </Text>
                  </Space>
                  <Space size={4}>
                    <EyeOutlined style={{ color: '#8C8C8C' }} />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {formatViews(post.views)} 次阅读
                    </Text>
                  </Space>
                </Space>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
              {/* Excerpt */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #E6F4FF, #F0F5FF)',
                  borderLeft: '4px solid #1677FF',
                  padding: '16px 20px',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: 32,
                }}
              >
                <Paragraph style={{ color: '#434343', fontSize: 15, marginBottom: 0, lineHeight: 1.8 }}>
                  {post.excerpt}
                </Paragraph>
              </div>

              {/* Article Body */}
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              <Divider />

              {/* Tags */}
              <div style={{ marginBottom: 24 }}>
                <Space size={8} wrap>
                  <TagsOutlined style={{ color: '#8C8C8C' }} />
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tags?tag=${encodeURIComponent(tag)}`}>
                      <Tag
                        color={getTagColor(tag)}
                        style={{ borderRadius: 20, padding: '2px 12px', cursor: 'pointer' }}
                      >
                        {tag}
                      </Tag>
                    </Link>
                  ))}
                </Space>
              </div>

              {/* Back Button */}
              <Link href="/">
                <Button icon={<ArrowLeftOutlined />} size="large">
                  返回文章列表
                </Button>
              </Link>
            </div>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                相关文章
              </Title>
              <Row gutter={[16, 16]}>
                {relatedPosts.map((p) => (
                  <Col key={p.id} xs={24} sm={8}>
                    <Link href={`/posts/${p.slug}`} style={{ textDecoration: 'none' }}>
                      <Card
                        hoverable
                        size="small"
                        style={{ borderRadius: 10, border: '1px solid #f0f0f0' }}
                        bodyStyle={{ padding: 16 }}
                      >
                        <Text strong style={{ fontSize: 13, lineHeight: 1.5, display: 'block', marginBottom: 6 }}>
                          {p.title}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {formatDate(p.publishedAt, { month: 'short', day: 'numeric', year: undefined })}
                        </Text>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>

        {/* Sidebar */}
        <Col xs={0} lg={7}>
          <div style={{ position: 'sticky', top: 80 }}>
            <Sidebar />
          </div>
        </Col>
      </Row>
    </div>
  )
}
