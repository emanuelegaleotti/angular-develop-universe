import type { EChartsCoreOption } from 'echarts/core'

export const CHART_COLORS = ['#8514f5', '#f637e3', '#fa2c05', '#0546ff', '#00ad9a', '#f11653', '#a39fa9']

const TEXT = '#413e46'
const MUTED = '#746e7c'
const GRID = '#e4e3e6'

export const chartBase: EChartsCoreOption = {
  color: CHART_COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: TEXT }
}

export const tooltip = (trigger: 'axis' | 'item' = 'item', extra: Record<string, unknown> = {}) => ({
  trigger,
  backgroundColor: '#fff',
  borderColor: GRID,
  borderWidth: 1,
  textStyle: { color: TEXT, fontSize: 13 },
  extraCssText: 'box-shadow: 0 8px 24px rgb(21 20 23 / 12%); border-radius: 8px;',
  ...extra
})

export const legend = (extra: Record<string, unknown> = {}) => ({
  top: 0,
  icon: 'circle',
  itemWidth: 10,
  itemHeight: 10,
  textStyle: { color: MUTED },
  ...extra
})

export const valueAxis = (extra: Record<string, unknown> = {}) => ({
  type: 'value' as const,
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: MUTED },
  splitLine: { lineStyle: { color: GRID, type: 'dashed' as const } },
  ...extra
})

export const categoryAxis = (data: (string | number)[], extra: Record<string, unknown> = {}) => ({
  type: 'category' as const,
  data,
  axisLine: { lineStyle: { color: '#ccc9cf' } },
  axisTick: { show: false },
  axisLabel: { color: MUTED },
  ...extra
})

export const gridBox = { top: 48, left: 16, right: 24, bottom: 16, containLabel: true }

export const WEEK_DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
export const MONTHS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
