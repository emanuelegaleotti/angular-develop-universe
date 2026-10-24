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
]


