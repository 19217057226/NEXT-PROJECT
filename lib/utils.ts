/**
 * 格式化日期为本地化字符串
 */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

/**
 * 格式化日期为相对时间（如"3天前"）
 */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days} 天前`
  if (days < 30) return `${Math.floor(days / 7)} 周前`
  if (days < 365) return `${Math.floor(days / 30)} 个月前`
  return `${Math.floor(days / 365)} 年前`
}

/**
 * 截断文本到指定长度
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/**
 * 生成随机颜色（用于标签）
 */
const TAG_COLORS = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'orange',
  'geekblue',
  'volcano',
] as const

export function getTagColor(tag: string): (typeof TAG_COLORS)[number] {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

/**
 * 格式化阅读时间
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '不到 1 分钟'
  return `约 ${minutes} 分钟`
}

/**
 * 格式化浏览量
 */
export function formatViews(views: number): string {
  if (views >= 10000) return `${(views / 10000).toFixed(1)}w`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`
  return views.toString()
}
