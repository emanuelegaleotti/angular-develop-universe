import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { categoryAxis, chartBase, gridBox, legend, tooltip, valueAxis, WEEK_DAYS } from '../chart-theme'

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

const WEEKLY = [120, 200, 150, 80, 70, 110, 130]
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']
const YEARS = [
  { name: '2024', data: [320, 332, 301, 334] },
  { name: '2025', data: [220, 182, 191, 234] },
  { name: '2026', data: [150, 232, 201, 154] }
]
const PLATFORMS = ['Web', 'Mobile', 'Desktop', 'Tablet']
const PLANS = [
  { name: 'Gratuiti', data: [320, 302, 301, 134] },
  { name: 'Pro', data: [120, 132, 101, 90] },
  { name: 'Enterprise', data: [220, 182, 191, 60] }
]

@Component({
  selector: 'ngu-kitchensink-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartBarComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
    grid: gridBox,
    xAxis: categoryAxis(WEEK_DAYS),
    yAxis: valueAxis(),
    series: [{ name: 'Vendite', type: 'bar', barMaxWidth: 36, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: WEEKLY }]
  }

  readonly groupedChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
    legend: legend(),
    grid: gridBox,
    xAxis: categoryAxis(QUARTERS),
    yAxis: valueAxis(),
    series: YEARS.map(y => ({ name: y.name, type: 'bar', barMaxWidth: 28, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: y.data }))
  }

  readonly stackedChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
    legend: legend(),
    grid: gridBox,
    xAxis: valueAxis(),
    yAxis: categoryAxis(PLATFORMS, { inverse: true }),
    series: PLANS.map(p => ({ name: p.name, type: 'bar', stack: 'utenti', barMaxWidth: 28, data: p.data }))
  }

  readonly simpleHighchartsOptions: Options = {
    chart: { type: 'column' },
    legend: { enabled: false },
    tooltip: { shared: true },
    xAxis: { categories: WEEK_DAYS },
    series: [{ type: 'column', name: 'Vendite', maxPointWidth: 36, borderRadius: 6, data: WEEKLY }]
  }

  readonly groupedHighchartsOptions: Options = {
    chart: { type: 'column' },
    tooltip: { shared: true },
    xAxis: { categories: QUARTERS },
    plotOptions: { column: { maxPointWidth: 28, borderRadius: 6 } },
    series: YEARS.map(y => ({ type: 'column', name: y.name, data: y.data }))
  }

  readonly stackedHighchartsOptions: Options = {
    chart: { type: 'bar' },
    tooltip: { shared: true },
    xAxis: { categories: PLATFORMS },
    yAxis: { reversedStacks: false },
    plotOptions: { bar: { stacking: 'normal', maxPointWidth: 28 } },
    series: PLANS.map(p => ({ type: 'bar', name: p.name, data: p.data }))
  }
}
