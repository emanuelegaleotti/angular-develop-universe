import { Routes } from '@angular/router'

export const chartsRoutes: Routes = [
  {
    path: 'line',
    loadComponent: () => import('./chart-line/chart-line.component').then(c => c.ChartLineComponent)
  },
  {
    path: 'bar',
    loadComponent: () => import('./chart-bar/chart-bar.component').then(c => c.ChartBarComponent)
  },
  {
    path: 'pie',
    loadComponent: () => import('./chart-pie/chart-pie.component').then(c => c.ChartPieComponent)
  },
  {
    path: 'scatter',
    loadComponent: () => import('./chart-scatter/chart-scatter.component').then(c => c.ChartScatterComponent)
  },
  {
    path: 'area',
    loadComponent: () => import('./chart-area/chart-area.component').then(c => c.ChartAreaComponent)
  },
  {
    path: 'radar',
    loadComponent: () => import('./chart-radar/chart-radar.component').then(c => c.ChartRadarComponent)
  },
  {
    path: 'gauge',
    loadComponent: () => import('./chart-gauge/chart-gauge.component').then(c => c.ChartGaugeComponent)
  },
  {
    path: 'heatmap',
    loadComponent: () => import('./chart-heatmap/chart-heatmap.component').then(c => c.ChartHeatmapComponent)
  },
  {
    path: 'funnel',
    loadComponent: () => import('./chart-funnel/chart-funnel.component').then(c => c.ChartFunnelComponent)
  },
  {
    path: 'treemap',
    loadComponent: () => import('./chart-treemap/chart-treemap.component').then(c => c.ChartTreemapComponent)
  },
  {
    path: 'candlestick',
    loadComponent: () => import('./chart-candlestick/chart-candlestick.component').then(c => c.ChartCandlestickComponent)
  },
  {
    path: 'sankey',
    loadComponent: () => import('./chart-sankey/chart-sankey.component').then(c => c.ChartSankeyComponent)
  },
]
