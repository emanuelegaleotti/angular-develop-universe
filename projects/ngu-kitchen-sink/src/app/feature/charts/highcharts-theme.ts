import type { Options } from 'highcharts'
import { CHART_COLORS } from './chart-theme'

const TEXT = '#413e46'
const MUTED = '#746e7c'
const GRID = '#e4e3e6'

// Global Highcharts options: the same palette, fonts and surfaces used for ECharts
export const highchartsTheme: Options = {
  colors: CHART_COLORS,
  chart: { backgroundColor: 'transparent', style: { fontFamily: 'Inter, sans-serif' }, spacingTop: 16, spacingRight: 16 },
  title: { text: undefined },
  credits: { enabled: false },
  legend: { alignColumns: false, itemStyle: { color: MUTED, fontWeight: '400' }, symbolHeight: 10, symbolWidth: 10, symbolRadius: 5 },
  tooltip: {
    backgroundColor: '#fff',
    borderColor: GRID,
    borderRadius: 8,
    style: { color: TEXT, fontSize: '13px' }
  },
  xAxis: {
    lineColor: '#ccc9cf',
    tickLength: 0,
    labels: { style: { color: MUTED } }
  },
  yAxis: {
    title: { text: undefined },
    gridLineColor: GRID,
    gridLineDashStyle: 'Dash',
    labels: { style: { color: MUTED } }
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      marker: { symbol: 'circle' },
      dataLabels: { style: { fontWeight: '500', textOutline: 'none' } }
    }
  }
}
