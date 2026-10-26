import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, tooltip } from '../chart-theme'

echarts.use([GaugeChart, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-gauge',
  templateUrl: './chart-gauge.component.html',
  styleUrl: './chart-gauge.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({
      modules: () => [import('highcharts/esm/highcharts-more').then(() => import('highcharts/esm/modules/solid-gauge'))]
    })
  ]
})
export class ChartGaugeComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    series: [{
      type: 'gauge',
      radius: '85%',
      progress: { show: true, width: 16, itemStyle: { color: '#8514f5' } },
      axisLine: { lineStyle: { width: 16, color: [[1, '#e4e3e6']] } },
      axisTick: { show: false },
      splitLine: { length: 10, lineStyle: { width: 2, color: '#ccc9cf' } },
      axisLabel: { distance: 24, color: '#746e7c' },
      pointer: { width: 5, itemStyle: { color: '#8514f5' } },
      anchor: { show: true, size: 16, itemStyle: { borderColor: '#8514f5', borderWidth: 4, color: '#fff' } },
      title: { offsetCenter: [0, '78%'], color: '#746e7c' },
      detail: { valueAnimation: true, offsetCenter: [0, '58%'], fontSize: 32, fontWeight: 600, color: '#151417', formatter: '{value}%' },
      data: [{ value: 72, name: 'CPU' }]
    }]
  }

  readonly zonesChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    series: [{
      type: 'gauge',
      radius: '85%',
      min: 0,
      max: 240,
      splitNumber: 8,
      axisLine: { lineStyle: { width: 14, color: [[0.4, '#00ad9a'], [0.75, '#fa2c05'], [1, '#f11653']] } },
      axisTick: { distance: -14, length: 5, lineStyle: { color: '#fff', width: 1 } },
      splitLine: { distance: -14, length: 14, lineStyle: { color: '#fff', width: 2 } },
      axisLabel: { distance: 22, color: '#746e7c' },
      pointer: { width: 5, itemStyle: { color: 'auto' } },
      anchor: { show: true, size: 14, itemStyle: { color: '#151417' } },
      title: { offsetCenter: [0, '78%'], color: '#746e7c' },
      detail: { offsetCenter: [0, '58%'], fontSize: 28, fontWeight: 600, color: 'inherit', formatter: '{value} km/h' },
      data: [{ value: 168, name: 'Velocità' }]
    }]
  }

  readonly simpleHighchartsOptions: Options = {
    chart: { type: 'solidgauge' },
    legend: { enabled: false },
    pane: {
      size: '85%',
      center: ['50%', '52%'],
      startAngle: -135,
      endAngle: 135,
      background: [{ shape: 'arc', outerRadius: '100%', innerRadius: '86%', backgroundColor: '#e4e3e6', borderWidth: 0 }]
    },
    yAxis: { min: 0, max: 100, lineWidth: 0, tickAmount: 2, minorTickLength: 0, tickWidth: 0, labels: { y: 20 } },
    tooltip: { enabled: false },
    series: [{
      type: 'solidgauge',
      name: 'CPU',
      radius: '100%',
      innerRadius: '86%',
      color: '#8514f5',
      data: [72],
      dataLabels: {
        useHTML: true,
        borderWidth: 0,
        y: -24,
        format: '<div style="text-align:center"><span style="font-size:2rem;font-weight:600;color:#151417">{y}%</span><br/><span style="color:#746e7c;font-weight:400">CPU</span></div>'
      }
    }]
  }

  readonly zonesHighchartsOptions: Options = {
    chart: { type: 'gauge' },
    legend: { enabled: false },
    pane: { size: '85%', center: ['50%', '52%'], startAngle: -135, endAngle: 135, background: [{ backgroundColor: 'transparent', borderWidth: 0 }] },
    yAxis: {
      min: 0,
      max: 240,
      tickInterval: 30,
      minorTickLength: 0,
      tickWidth: 2,
      tickLength: 10,
      tickColor: '#ccc9cf',
      lineWidth: 0,
      labels: { distance: 14, style: { color: '#746e7c' } },
      plotBands: [
        { from: 0, to: 96, color: '#00ad9a', thickness: 14 },
        { from: 96, to: 180, color: '#fa2c05', thickness: 14 },
        { from: 180, to: 240, color: '#f11653', thickness: 14 }
      ]
    },
    tooltip: { valueSuffix: ' km/h' },
    series: [{
      type: 'gauge',
      name: 'Velocità',
      data: [168],
      dial: { radius: '78%', backgroundColor: '#151417', baseWidth: 8, rearLength: '0%' },
      pivot: { radius: 7, backgroundColor: '#151417' },
      dataLabels: { borderWidth: 0, y: 24, format: '{y} km/h', style: { fontSize: '1.75rem', fontWeight: '600', color: '#151417' } }
    }]
  }
}
