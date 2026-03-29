'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Row, Col, Typography, Select, Pagination, Empty, Spin, Breadcrumb } from 'antd'
import { FilterOutlined, FireOutlined } from '@ant-design/icons'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import { getPaginatedPosts, categories } from '@/data/mock-posts'
import { siteConfig } from '@/data/site-config'

const { Title, Paragraph } = Typography

const PAGE_SIZE = 6

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10)
  const currentCat = searchParams.get('cat') ?? ''

  const [selectedCat, setSelectedCat] = useState(currentCat)

  const catSlugToName: Record<string, string> = {}
  categories.forEach((c) => {
    catSlugToName[c.slug] = c.name
  })

  const categoryName = selectedCat ? catSlugToName[selectedCat] : undefined
  const { data: posts, total } = getPaginatedPosts(currentPage, PAGE_SIZE, categoryName)

  const handleCatChange = (value: string) => {
    setSelectedCat(value)
    router.push(value ? `/?cat=${value}` : '/')
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    if (selectedCat) params.set('cat', selectedCat)
    params.set('page', String(page))
    router.push(`/?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F5FF 50%, #F5F5F5 100%)',
          borderRadius: 16,
          padding: '40px 48px',
          marginBottom: 32,
          border: '1px solid #BAE0FF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(22,119,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <Breadcrumb
          items={[{ title: '首页' }, { title: selectedCat ? catSlugToName[selectedCat] : '全部文章' }]}
          style={{ marginBottom: 12 }}
        />
        <Title
          level={1}
          style={{
            marginBottom: 8,
            background: 'linear-gradient(135deg, #1677FF, #0958D9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: 32,
          }}
        >
          <FireOutlined style={{ WebkitTextFillColor: '#FA8C16', marginRight: 8 }} />
          {siteConfig.name}
        </Title>
        <Paragraph style={{ color: '#595959', fontSize: 16, marginBottom: 0 }}>
          {siteConfig.tagline}
        </Paragraph>
      </div>

      <Row gutter={[24, 0]}>
        {/* Main Content */}
        <Col xs={24} lg={17}>
          {/* Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Title level={4} style={{ margin: 0, fontSize: 18 }}>
              {selectedCat
                ? `${catSlugToName[selectedCat]} · ${total} 篇`
                : `全部文章 · ${total} 篇`}
            </Title>
            <Select
              value={selectedCat || 'all'}
              onChange={handleCatChange}
              style={{ width: 140 }}
              suffixIcon={<FilterOutlined />}
              options={[
                { value: 'all', label: '全部分类' },
                ...categories.map((c) => ({ value: c.slug, label: c.name })),
              ]}
              onChange={(val) => handleCatChange(val === 'all' ? '' : val)}
            />
          </div>

          {/* Post Grid */}
          {posts.length === 0 ? (
            <Empty description="暂无文章" style={{ padding: '60px 0' }} />
          ) : (
            <>
              <Row gutter={[20, 20]}>
                {posts.map((post) => (
                  <Col key={post.id} xs={24} sm={12} xl={12}>
                    <PostCard post={post} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {total > PAGE_SIZE && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <Pagination
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(t) => `共 ${t} 篇文章`}
                  />
                </div>
              )}
            </>
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

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>}>
      <HomeContent />
    </Suspense>
  )
}
