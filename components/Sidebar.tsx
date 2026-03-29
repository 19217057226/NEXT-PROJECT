'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, Tag, Typography, Space, Avatar, Divider } from 'antd'
import { FolderOutlined, TagsOutlined } from '@ant-design/icons'
import { categories, allTags } from '@/data/mock-posts'
import { siteConfig } from '@/data/site-config'
import { getTagColor } from '@/lib/utils'

const { Title, Text, Paragraph } = Typography

export default function Sidebar() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* 作者简介 */}
      <Card
        style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ textAlign: 'center' }}>
          <Avatar
            src={siteConfig.author.avatar}
            size={72}
            style={{ marginBottom: 12, border: '3px solid #E6F4FF' }}
          />
          <Title level={5} style={{ marginBottom: 4 }}>
            {siteConfig.author.name}
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 0 }}>
            {siteConfig.author.bio}
          </Paragraph>
        </div>
      </Card>

      {/* 分类 */}
      <Card
        title={
          <Space>
            <FolderOutlined style={{ color: '#1677FF' }} />
            <span>分类</span>
          </Space>
        }
        style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}
        bodyStyle={{ padding: '8px 16px' }}
        headStyle={{ borderBottom: '1px solid #f5f5f5', paddingBottom: 12 }}
      >
        {categories.map((cat, index) => (
          <div key={cat.id}>
            <Link
              href={`/categories?cat=${cat.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  transition: 'color 0.2s',
                }}
                className="sidebar-link"
              >
                <Text style={{ fontSize: 14 }}>{cat.name}</Text>
                <Tag color="blue" style={{ borderRadius: 20, fontSize: 12 }}>
                  {cat.count}
                </Tag>
              </div>
            </Link>
            {index < categories.length - 1 && <Divider style={{ margin: 0 }} />}
          </div>
        ))}
      </Card>

      {/* 热门标签 */}
      <Card
        title={
          <Space>
            <TagsOutlined style={{ color: '#1677FF' }} />
            <span>热门标签</span>
          </Space>
        }
        style={{ borderRadius: 12, border: '1px solid #f0f0f0' }}
        bodyStyle={{ padding: 16 }}
        headStyle={{ borderBottom: '1px solid #f5f5f5' }}
      >
        <Space size={[8, 8]} wrap>
          {allTags.slice(0, 15).map(({ name }) => (
            <Link key={name} href={`/tags?tag=${encodeURIComponent(name)}`}>
              <Tag
                color={getTagColor(name)}
                style={{
                  borderRadius: 20,
                  cursor: 'pointer',
                  padding: '2px 10px',
                  transition: 'opacity 0.2s',
                }}
              >
                {name}
              </Tag>
            </Link>
          ))}
        </Space>
      </Card>

      {/* 博客简介 */}
      <Card
        style={{
          borderRadius: 12,
          background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F5FF 100%)',
          border: '1px solid #BAE0FF',
        }}
        bodyStyle={{ padding: 20 }}
      >
        <Title level={5} style={{ color: '#0958D9', marginBottom: 8 }}>
          关于 {siteConfig.name}
        </Title>
        <Text style={{ fontSize: 13, color: '#434343', lineHeight: 1.7 }}>
          {siteConfig.description}
        </Text>
      </Card>
    </Space>
  )
}
