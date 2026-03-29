'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, Tag, Typography, Space, Avatar } from 'antd'
import { CalendarOutlined, ClockCircleOutlined, EyeOutlined, FolderOutlined } from '@ant-design/icons'
import { Post } from '@/data/mock-posts'
import { formatDate, formatReadingTime, formatViews, getTagColor } from '@/lib/utils'

const { Title, Paragraph, Text } = Typography

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card
        hoverable
        cover={
          <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="post-card-image"
            />
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
              }}
            >
              <Tag
                icon={<FolderOutlined />}
                color="blue"
                style={{ borderRadius: 20, fontWeight: 500 }}
              >
                {post.category}
              </Tag>
            </div>
          </div>
        }
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #f0f0f0',
          transition: 'all 0.3s ease',
          height: '100%',
        }}
        bodyStyle={{ padding: '20px' }}
        className="post-card"
      >
        {/* Tags */}
        <Space size={[4, 4]} wrap style={{ marginBottom: 12 }}>
          {post.tags.slice(0, 3).map((tag) => (
            <Tag
              key={tag}
              color={getTagColor(tag)}
              style={{ borderRadius: 4, fontSize: 11, padding: '0 6px' }}
            >
              {tag}
            </Tag>
          ))}
        </Space>

        {/* Title */}
        <Title
          level={5}
          style={{
            marginBottom: 10,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          className="post-card-title"
        >
          {post.title}
        </Title>

        {/* Excerpt */}
        <Paragraph
          type="secondary"
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </Paragraph>

        {/* Author & Meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space size={8}>
            <Avatar src={post.author.avatar} size={28} />
            <Text style={{ fontSize: 13, color: '#595959' }}>{post.author.name}</Text>
          </Space>
          <Space size={12}>
            <Text type="secondary" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <CalendarOutlined />
              {formatDate(post.publishedAt, { month: 'short', day: 'numeric', year: undefined })}
            </Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ClockCircleOutlined />
              {formatReadingTime(post.readingTime)}
            </Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined />
              {formatViews(post.views)}
            </Text>
          </Space>
        </div>
      </Card>
    </Link>
  )
}
