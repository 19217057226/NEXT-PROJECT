import { theme } from 'antd'
import type { ThemeConfig } from 'antd'

export function getAntdTheme(isDark: boolean): ThemeConfig {
  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1677FF',
      colorLink: '#1677FF',
      borderRadius: 8,
      fontFamily: "'Noto Sans SC', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      colorBgLayout: isDark ? '#141414' : '#F0F0F0',
    },
    components: {
      Menu: {
        iconSize: 18,
        collapsedIconSize: 18,
        itemHeight: 44,
        itemMarginInline: 8,
        itemPaddingInline: 12,
        itemSelectedColor: '#1677FF',
        itemHoverColor: '#1677FF',
        itemHoverBg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(22,119,255,0.06)',
      },
      Card: {
        headerBg: isDark ? undefined : '#FFFFFF',
      },
      Layout: {
        headerBg: isDark ? '#1f1f1f' : '#FFFFFF',
        bodyBg: isDark ? '#141414' : '#F0F0F0',
        triggerBg: isDark ? '#1f1f1f' : '#FFFFFF',
        siderBg: isDark ? '#1f1f1f' : '#FFFFFF',
        lightSiderBg: '#FFFFFF',
      },
    },
  }
}
