import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { LegendComponent, RadarComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options, SeriesAreaOptions } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, legend, tooltip } from '../chart-theme'

echarts.use([RadarChart, LegendComponent, RadarComponent, TooltipComponent, CanvasRenderer])

const AXES = ['Velocità', 'Affidabilità', 'Costo', 'Supporto', 'Sicurezza', 'Scalabilità']
const PRODUCTS = [
  { name: 'Prodotto A', value: [82, 90, 60, 75, 88, 70] },
  { name: 'Prodotto B', value: [65, 70, 90, 85, 60, 92] },
  { name: 'Prodotto C', value: [95, 55, 45, 60, 72, 80] }
]

const radar = {
  indicator: AXES.map(name => ({ name, max: 100 })),
  radius: '62%',
  center: ['50%', '54%'],
  axisName: { color: '#746e7c' },
  splitLine: { lineStyle: { color: '#e4e3e6' } },
  splitArea: { show: false },
  axisLine: { lineStyle: { color: '#e4e3e6' } }
}

const polar = (series: SeriesAreaOptions[], extra: Options = {}): Options => ({
  chart: { polar: true, type: 'area' },
  pane: { size: '70%' },
  tooltip: { shared: true },
  xAxis: { categories: AXES, tickmarkPlacement: 'on', lineWidth: 0 },
  yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 100, tickInterval: 25, labels: { enabled: false } },
  series,
  ...extra
})

@Component({
  selector: 'ngu-kitchensink-chart-radar',
  templateUrl: './chart-radar.component.html',
  styleUrl: './chart-radar.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/highcharts-more')] })
  ]
})
export class ChartRadarComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    radar,
    series: [{
      type: 'radar',
      areaStyle: { opacity: 0.2 },
      symbolSize: 6,
      data: PRODUCTS.slice(0, 1)
    }]
  }

  readonly compareChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    legend: legend(),
    radar,
    series: [{
      type: 'radar',
      areaStyle: { opacity: 0.15 },
      symbolSize: 6,
      data: PRODUCTS
    }]
  }

  readonly simpleHighchartsOptions: Options = polar(
    PRODUCTS.slice(0, 1).map(p => ({ type: 'area', name: p.name, pointPlacement: 'on', fillOpacity: 0.2, marker: { radius: 3 }, data: p.value })),
    { legend: { enabled: false } }
  )

  readonly compareHighchartsOptions: Options = polar(
    PRODUCTS.map(p => ({ type: 'area', name: p.name, pointPlacement: 'on', fillOpacity: 0.15, marker: { radius: 3 }, data: p.value }))
  )
}
