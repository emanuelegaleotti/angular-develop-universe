import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { BarChart, CandlestickChart } from 'echarts/charts'
import { DataZoomComponent, GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { categoryAxis, chartBase, gridBox, tooltip, valueAxis } from '../chart-theme'

echarts.use([CandlestickChart, BarChart, DataZoomComponent, GridComponent, TooltipComponent, CanvasRenderer])

// [apertura, chiusura, minimo, massimo]
const OHLC = [
  [20, 34, 10, 38], [40, 35, 30, 50], [31, 38, 33, 44], [38, 15, 5, 42], [15, 22, 12, 28],
  [22, 29, 20, 35], [29, 25, 21, 33], [25, 40, 24, 43], [40, 46, 38, 52], [46, 41, 36, 49]
]
const DAYS = OHLC.map((_, i) => `G${i + 1}`)
const VOLUMES = [320, 302, 301, 334, 390, 330, 320, 410, 380, 290]

const UP = '#00ad9a'
const DOWN = '#f11653'

// Highcharts Stock expects [x, apertura, massimo, minimo, chiusura]
const OHLC_STOCK = OHLC.map(([open, close, low, high], i) => [i, open, high, low, close])

const stock = (extra: Options): Options => ({
  navigator: { enabled: false },
  scrollbar: { enabled: false },
  rangeSelector: { enabled: false },
  legend: { enabled: false },
  tooltip: { shared: true, split: false },
  // Stock charts use a datetime axis: a plain linear axis with day labels keeps the same G1..G10 ticks
  xAxis: { type: 'linear', ordinal: false, tickInterval: 1, crosshair: true, labels: { formatter: ({ value }) => DAYS[value as number] ?? '' } },
  ...extra
})

@Component({
  selector: 'ngu-kitchensink-chart-candlestick',
  templateUrl: './chart-candlestick.component.html',
  styleUrl: './chart-candlestick.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/modules/stock')] })
  ]
})
export class ChartCandlestickComponent {
  readonly chartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis', { axisPointer: { type: 'cross' } }),
    grid: gridBox,
    xAxis: categoryAxis(DAYS),
    yAxis: valueAxis({ scale: true }),
    series: [{
      name: 'Prezzo',
      type: 'candlestick',
      data: OHLC,
      itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN }
    }]
  }

  readonly volumeChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis', { axisPointer: { type: 'cross' } }),
    axisPointer: { link: [{ xAxisIndex: 'all' }] },
    grid: [
      { top: 24, left: 16, right: 24, height: '52%', containLabel: true },
      { top: '72%', left: 16, right: 24, height: '14%', containLabel: true }
    ],
    xAxis: [
      categoryAxis(DAYS, { gridIndex: 0, axisLabel: { show: false } }),
      categoryAxis(DAYS, { gridIndex: 1 })
    ],
    yAxis: [
      valueAxis({ gridIndex: 0, scale: true }),
      valueAxis({ gridIndex: 1, splitNumber: 2, axisLabel: { show: false }, splitLine: { show: false } })
    ],
    dataZoom: [{ type: 'inside', xAxisIndex: [0, 1], start: 0, end: 100 }],
    series: [
      {
        name: 'Prezzo',
        type: 'candlestick',
        data: OHLC,
        itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN }
      },
      { name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: '#ccc9cf' }, data: VOLUMES }
    ]
  }

  readonly highchartsOptions: Options = stock({
    yAxis: { opposite: false },
    series: [{
      type: 'candlestick',
      name: 'Prezzo',
      color: DOWN,
      lineColor: DOWN,
      upColor: UP,
      upLineColor: UP,
      data: OHLC_STOCK
    }]
  })

  readonly volumeHighchartsOptions: Options = stock({
    yAxis: [
      { opposite: false, height: '62%', labels: { align: 'right', x: -4 } },
      { opposite: false, top: '70%', height: '24%', offset: 0, gridLineWidth: 0, labels: { enabled: false }, title: { text: undefined } }
    ],
    series: [
      { type: 'candlestick', name: 'Prezzo', color: DOWN, lineColor: DOWN, upColor: UP, upLineColor: UP, data: OHLC_STOCK },
      { type: 'column', name: 'Volume', yAxis: 1, color: '#ccc9cf', data: VOLUMES.map((v, i) => [i, v]) }
    ]
  })
}
