'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Row, Col, Typography, Tag, Card, Empty, Breadcrumb, Space, Spin } from 'antd'
import { TagsOutlined, FileTextOutlined } from '@ant-design/icons'
import PostCard from '@/components/PostCard'
import { allTags, getPostsByTag } from '@/data/mock-posts'
import { getTagColor } from '@/lib/utils'

const { Title, Paragraph } = Typography

function TagsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTag = searchParams.get('tag') ?? ''

  const filteredPosts = activeTag ? getPostsByTag(activeTag) : []

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/">首页</Link> },
          { title: '标签' },
          ...(activeTag ? [{ title: activeTag }] : []),
        ]}
      />

      <div
        style={{
          background: 'linear-gradient(135deg, #FFF7E6 0%, #FFF9F0 50%, #F5F5F5 100%)',
          borderRadius: 16,
          padding: '32px 40px',
          marginBottom: 32,
          border: '1px solid #FFD591',
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 8,
            background: 'linear-gradient(135deg, #FA8C16, #D46B08)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <TagsOutlined style={{ WebkitTextFillColor: '#FA8C16', marginRight: 8 }} />
          标签云
        </Title>
        <Paragraph style={{ color: '#595959', marginBottom: 0 }}>
          共 {allTags.length} 个标签，点击标签筛选相关文章
        </Paragraph>
      </div>

      {/* Tag Cloud */}
      <Card
        style={{ borderRadius: 16, marginBottom: 40, border: '1px solid #f0f0f0' }}
        bodyStyle={{ padding: '28px 32px' }}
      >
        <Space size={[10, 10]} wrap>
          {allTags.map(({ name, count }) => {
            const isActive = activeTag === name
            const size = count >= 3 ? 16 : count >= 2 ? 14 : 13

            return (
              <Tag
                key={name}
                color={isActive ? getTagColor(name) : undefined}
                onClick={() => router.push(`/tags?tag=${encodeURIComponent(name)}`)}
                style={{
                  borderRadius: 20,
                  padding: '4px 14px',
                  fontSize: size,
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  border: isActive ? undefined : '1px solid #d9d9d9',
                  transition: 'all 0.2s',
                  opacity: activeTag && !isActive ? 0.6 : 1,
                }}
              >
                {name}
                <span
                  style={{
                    marginLeft: 4,
                    fontSize: 11,
                    opacity: 0.7,
                  }}
                >
                  {count}
                </span>
              </Tag>
            )
          })}
        </Space>
      </Card>

      {/* Filtered Posts */}
      {activeTag && (
        <div>
          <Title level={4} style={{ marginBottom: 20 }}>
            <FileTextOutlined style={{ marginRight: 8, color: '#FA8C16' }} />
            标签「{activeTag}」· {filteredPosts.length} 篇文章
          </Title>
          {filteredPosts.length === 0 ? (
            <Empty description="暂无文章" />
          ) : (
            <Row gutter={[20, 20]}>
              {filteredPosts.map((post) => (
                <Col key={post.id} xs={24} sm={12} md={8}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      {!activeTag && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Paragraph type="secondary">👆 点击上方标签查看相关文章</Paragraph>
        </div>
      )}
    </div>
  )
}

export default function TagsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>}>
      <TagsContent />
    </Suspense>
  )
}
