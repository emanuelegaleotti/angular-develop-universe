import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { AriaComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { categoryAxis, chartBase, gridBox, legend, tooltip, valueAxis, WEEK_DAYS } from '../chart-theme'

echarts.use([LineChart, AriaComponent, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

const WEEKLY = [120, 225, 150, 80, 70, 110, 130]
const YEARS = Array.from({ length: 13 }, (_, i) => String(2010 + i))
const SECTORS = [
  { name: 'Installazione', data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610, 168960, 171558] },
  { name: 'Produzione', data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050, 33099, 33473] },
  { name: 'Vendite', data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663, 28978, 30618] },
  { name: 'Manutenzione', data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077, 12530, 16585] }
]
const ORDERS = [12, 18, 16, 24, 30, 22, 14]
const RETURNS = [2, 3, 2, 5, 6, 4, 3]

@Component({
  selector: 'ngu-kitchensink-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartLineComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis'),
    grid: gridBox,
    xAxis: categoryAxis(WEEK_DAYS, { boundaryGap: false }),
    yAxis: valueAxis(),
    series: [{ name: 'Vendite', type: 'line', data: WEEKLY, symbolSize: 8 }]
  }

  readonly smoothChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis'),
    legend: legend(),
    grid: gridBox,
    aria: { show: true },
    xAxis: categoryAxis(YEARS, { boundaryGap: false }),
    yAxis: valueAxis({ name: 'Addetti', nameTextStyle: { color: '#746e7c' } }),
    series: SECTORS.map(s => ({ name: s.name, type: 'line', smooth: true, showSymbol: false, data: s.data }))
  }

  readonly steppedChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis'),
    legend: legend(),
    grid: gridBox,
    xAxis: categoryAxis(WEEK_DAYS),
    yAxis: valueAxis(),
    series: [
      { name: 'Ordini', type: 'line', step: 'middle', data: ORDERS },
      { name: 'Resi', type: 'line', step: 'middle', lineStyle: { type: 'dashed' }, data: RETURNS }
    ]
  }

  readonly simpleHighchartsOptions: Options = {
    legend: { enabled: false },
    tooltip: { shared: true },
    xAxis: { categories: WEEK_DAYS, tickmarkPlacement: 'on', crosshair: true },
    yAxis: { min: 0 },
    series: [{ type: 'line', name: 'Vendite', marker: { radius: 4 }, data: WEEKLY }]
  }

  readonly smoothHighchartsOptions: Options = {
    tooltip: { shared: true },
    xAxis: { categories: YEARS, tickmarkPlacement: 'on', crosshair: true },
    yAxis: { title: { text: 'Addetti', style: { color: '#746e7c' } } },
    plotOptions: { spline: { marker: { enabled: false } } },
    series: SECTORS.map(s => ({ type: 'spline', name: s.name, data: s.data }))
  }

  readonly steppedHighchartsOptions: Options = {
    tooltip: { shared: true },
    xAxis: { categories: WEEK_DAYS, crosshair: true },
    series: [
      { type: 'line', name: 'Ordini', step: 'center', data: ORDERS },
      { type: 'line', name: 'Resi', step: 'center', dashStyle: 'Dash', data: RETURNS }
    ]
  }
}
