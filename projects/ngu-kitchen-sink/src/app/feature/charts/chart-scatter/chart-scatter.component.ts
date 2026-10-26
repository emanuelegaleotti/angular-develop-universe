import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, gridBox, legend, tooltip, valueAxis } from '../chart-theme'

echarts.use([ScatterChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

// Generatore pseudo-casuale deterministico, così il grafico non cambia a ogni render
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}

const cloud = (seed: number, cx: number, cy: number, n = 40): number[][] => {
  const rnd = seeded(seed)
  return Array.from({ length: n }, () => [
    +(cx + (rnd() - 0.5) * 30).toFixed(1),
    +(cy + (rnd() - 0.5) * 30).toFixed(1)
  ])
}

const POINTS = [[10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33], [14, 9.96], [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82], [5, 5.68]]
const CLUSTERS = [
  { name: 'Gruppo A', data: cloud(11, 25, 25) },
  { name: 'Gruppo B', data: cloud(23, 60, 40) },
  { name: 'Gruppo C', data: cloud(37, 40, 70) }
]
// [reddito, aspettativa di vita, popolazione, paese]
const COUNTRIES: [number, number, number, string][] = [
  [28604, 77, 17096, 'Italia'], [31163, 77.4, 27662, 'Spagna'], [1516, 68, 1154, 'Kenya'], [13670, 74.7, 10582, 'Cile'],
  [28599, 75, 4986, 'Irlanda'], [29476, 77.1, 31616, 'Canada'], [31476, 75.4, 3600, 'Norvegia'], [34000, 79, 8000, 'Svizzera']
]

@Component({
  selector: 'ngu-kitchensink-chart-scatter',
  templateUrl: './chart-scatter.component.html',
  styleUrl: './chart-scatter.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/highcharts-more')] })
  ]
})
export class ChartScatterComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    grid: gridBox,
    xAxis: valueAxis({ splitLine: { show: false } }),
    yAxis: valueAxis(),
    series: [{ name: 'Vendite', type: 'scatter', symbolSize: 14, data: POINTS }]
  }

  readonly clustersOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    legend: legend(),
    grid: gridBox,
    xAxis: valueAxis({ splitLine: { show: false } }),
    yAxis: valueAxis(),
    series: CLUSTERS.map(c => ({ name: c.name, type: 'scatter', symbolSize: 10, data: c.data }))
  }

  readonly bubbleOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item', { formatter: (p: { data: [number, number, number, string] }) => `${p.data[3]}<br/>Reddito: ${p.data[0]}<br/>Aspettativa: ${p.data[1]}<br/>Popolazione: ${p.data[2]}` }),
    grid: { ...gridBox, bottom: 40 },
    xAxis: valueAxis({ name: 'Reddito', nameLocation: 'middle', nameGap: 30, splitLine: { show: false } }),
    yAxis: valueAxis({ name: 'Aspettativa', min: 60, max: 84 }),
    series: [{
      type: 'scatter',
      symbolSize: (d: number[]) => Math.sqrt(d[2]) * 0.6,
      itemStyle: { opacity: 0.75 },
      data: COUNTRIES
    }]
  }

  readonly simpleHighchartsOptions: Options = {
    chart: { type: 'scatter' },
    legend: { enabled: false },
    tooltip: { pointFormat: 'Vendite: <b>{point.x}, {point.y}</b>' },
    series: [{ type: 'scatter', name: 'Vendite', marker: { radius: 7 }, data: POINTS }]
  }

  readonly clustersHighchartsOptions: Options = {
    chart: { type: 'scatter' },
    plotOptions: { scatter: { marker: { radius: 5 } } },
    series: CLUSTERS.map(c => ({ type: 'scatter', name: c.name, data: c.data }))
  }

  readonly bubbleHighchartsOptions: Options = {
    chart: { type: 'bubble' },
    legend: { enabled: false },
    xAxis: { title: { text: 'Reddito', style: { color: '#746e7c' } }, gridLineWidth: 0 },
    yAxis: { title: { text: 'Aspettativa', style: { color: '#746e7c' } }, min: 60, max: 84 },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.name}<br/>Reddito: {point.x}<br/>Aspettativa: {point.y}<br/>Popolazione: {point.z}'
    },
    plotOptions: { bubble: { minSize: 8, maxSize: 60, marker: { fillOpacity: 0.75 } } },
    series: [{ type: 'bubble', name: 'Paesi', data: COUNTRIES.map(([x, y, z, name]) => ({ x, y, z, name })) }]
  }
}
