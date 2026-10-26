import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { HeatmapChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { categoryAxis, chartBase, tooltip, WEEK_DAYS } from '../chart-theme'

echarts.use([HeatmapChart, GridComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

const HOURS = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`)

// Valori deterministici: più attività nelle ore centrali dei giorni lavorativi
const activity = WEEK_DAYS.flatMap((_, d) =>
  HOURS.map((_, h) => {
    const peak = Math.exp(-Math.pow(h - 6.5, 2) / 6)
    const weekend = d > 4 ? 0.35 : 1
    return [h, d, Math.round(peak * weekend * 80 + ((h * 7 + d * 13) % 17))]
  })
)

@Component({
  selector: 'ngu-kitchensink-chart-heatmap',
  templateUrl: './chart-heatmap.component.html',
  styleUrl: './chart-heatmap.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/modules/heatmap')] })
  ]
})
export class ChartHeatmapComponent {
  readonly chartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item', { position: 'top' }),
    grid: { top: 16, left: 16, right: 16, bottom: 64, containLabel: true },
    xAxis: categoryAxis(HOURS, { splitArea: { show: false } }),
    yAxis: categoryAxis(WEEK_DAYS, { inverse: true }),
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#f7f1fe', '#f637e3', '#8514f5'] },
      textStyle: { color: '#746e7c' }
    },
    series: [{
      name: 'Attività',
      type: 'heatmap',
      data: activity,
      itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 4 },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(21, 20, 23, 0.25)' } }
    }]
  }

  readonly highchartsOptions: Options = {
    chart: { type: 'heatmap' },
    xAxis: { categories: HOURS, labels: { step: 2 } },
    yAxis: { categories: WEEK_DAYS, reversed: true, gridLineWidth: 0 },
    colorAxis: { min: 0, max: 100, stops: [[0, '#f7f1fe'], [0.5, '#f637e3'], [1, '#8514f5']] },
    legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal', symbolWidth: 280, symbolHeight: 10 },
    tooltip: {
      headerFormat: '',
      formatter() {
        const { x, y, value } = this as unknown as { x: number; y: number; value: number }
        return `${WEEK_DAYS[y]} ${HOURS[x]}<br/>Attività: <b>${value}</b>`
      }
    },
    series: [{
      type: 'heatmap',
      name: 'Attività',
      borderWidth: 3,
      borderColor: '#fff',
      borderRadius: 4,
      marker: { symbol: 'rect' },
      data: activity
    }]
  }
}
