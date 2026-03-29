'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Row, Col, Typography, Card, Tag, Empty, Breadcrumb, Spin, Statistic } from 'antd'
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons'
import PostCard from '@/components/PostCard'
import { categories, getPostsByCategory } from '@/data/mock-posts'

const { Title, Paragraph } = Typography

const CATEGORY_COLORS: Record<string, string> = {
  前端开发: '#1677FF',
  后端开发: '#52C41A',
  编程语言: '#722ED1',
  CSS: '#FA8C16',
}

function CategoriesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeCat = searchParams.get('cat') ?? ''

  const currentCategory = categories.find((c) => c.slug === activeCat)
  const filteredPosts = currentCategory ? getPostsByCategory(currentCategory.name) : []

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/">首页</Link> },
          { title: '分类' },
          ...(currentCategory ? [{ title: currentCategory.name }] : []),
        ]}
      />

      <div
        style={{
          background: 'linear-gradient(135deg, #F9F0FF 0%, #F5F5F5 100%)',
          borderRadius: 16,
          padding: '32px 40px',
          marginBottom: 32,
          border: '1px solid #EBD4FC',
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 8,
            background: 'linear-gradient(135deg, #722ED1, #9254DE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <FolderOutlined style={{ WebkitTextFillColor: '#722ED1', marginRight: 8 }} />
          文章分类
        </Title>
        <Paragraph style={{ color: '#595959', marginBottom: 0 }}>
          按照主题分类浏览，快速找到你感兴趣的内容
        </Paragraph>
      </div>

      {/* Category Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 40 }}>
        {categories.map((cat) => (
          <Col key={cat.id} xs={12} sm={12} md={6}>
            <Card
              hoverable
              onClick={() => router.push(`/categories?cat=${cat.slug}`)}
              style={{
                borderRadius: 12,
                cursor: 'pointer',
                border: activeCat === cat.slug ? `2px solid ${CATEGORY_COLORS[cat.name] ?? '#1677FF'}` : '1px solid #f0f0f0',
                transition: 'all 0.3s ease',
                background: activeCat === cat.slug ? `${CATEGORY_COLORS[cat.name] ?? '#1677FF'}10` : '#fff',
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ marginBottom: 12 }}>
                <Tag
                  color={activeCat === cat.slug ? 'blue' : 'default'}
                  style={{ borderRadius: 20, padding: '2px 10px', marginBottom: 8 }}
                >
                  <FolderOutlined /> {cat.name}
                </Tag>
              </div>
              <Statistic
                value={cat.count}
                suffix="篇"
                valueStyle={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: CATEGORY_COLORS[cat.name] ?? '#1677FF',
                }}
              />
              <Paragraph
                type="secondary"
                ellipsis={{ rows: 2 }}
                style={{ fontSize: 12, marginBottom: 0, marginTop: 8 }}
              >
                {cat.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filtered Posts */}
      {currentCategory && (
        <div>
          <Title level={4} style={{ marginBottom: 20 }}>
            <FileTextOutlined style={{ marginRight: 8, color: '#1677FF' }} />
            {currentCategory.name} · {filteredPosts.length} 篇文章
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

      {!currentCategory && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Paragraph type="secondary">👆 点击上方分类卡片查看对应文章</Paragraph>
        </div>
      )}
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>}>
      <CategoriesContent />
    </Suspense>
  )
}
