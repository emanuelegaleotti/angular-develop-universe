import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, legend, tooltip } from '../chart-theme'

echarts.use([PieChart, LegendComponent, TooltipComponent, CanvasRenderer])

const DATA = [
  { value: 335, name: 'Prodotto A' },
  { value: 234, name: 'Prodotto B' },
  { value: 154, name: 'Prodotto C' },
  { value: 110, name: 'Prodotto D' }
]

@Component({
  selector: 'ngu-kitchensink-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/modules/variable-pie')] })
  ]
})
export class ChartPieComponent {
  readonly pieOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    legend: legend({ top: 'bottom' }),
    series: [{ name: 'Vendite', type: 'pie', radius: '65%', center: ['50%', '45%'], itemStyle: { borderColor: '#fff', borderWidth: 2 }, data: DATA }]
  }

  readonly donutOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    legend: legend({ top: 'bottom' }),
    series: [{
      name: 'Vendite',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 18, fontWeight: 600 } },
      data: DATA
    }]
  }

  readonly roseOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item'),
    legend: legend({ top: 'bottom' }),
    series: [{
      name: 'Vendite',
      type: 'pie',
      roseType: 'radius',
      radius: ['15%', '70%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 6 },
      data: DATA
    }]
  }

  readonly pieHighchartsOptions: Options = {
    legend: { align: 'center', verticalAlign: 'bottom' },
    plotOptions: { pie: { showInLegend: true, size: '70%', borderColor: '#fff', borderWidth: 2, dataLabels: { enabled: false } } },
    series: [{ type: 'pie', name: 'Vendite', data: DATA.map(d => ({ name: d.name, y: d.value })) }]
  }

  readonly donutHighchartsOptions: Options = {
    legend: { align: 'center', verticalAlign: 'bottom' },
    plotOptions: { pie: { showInLegend: true, size: '75%', innerSize: '64%', borderRadius: 8, borderColor: '#fff', borderWidth: 2, dataLabels: { enabled: false } } },
    series: [{ type: 'pie', name: 'Vendite', data: DATA.map(d => ({ name: d.name, y: d.value })) }]
  }

  // Highcharts has no rose type: a variable-radius pie, with radius and angle both driven by the value, is the equivalent
  readonly roseHighchartsOptions: Options = {
    legend: { align: 'center', verticalAlign: 'bottom' },
    tooltip: { pointFormat: '{point.name}: <b>{point.z}</b>' },
    series: [{
      type: 'variablepie',
      name: 'Vendite',
      innerSize: '20%',
      zMin: 0,
      sizeBy: 'radius',
      showInLegend: true,
      borderRadius: 6,
      borderColor: '#fff',
      borderWidth: 2,
      dataLabels: { enabled: false },
      data: DATA.map(d => ({ name: d.name, y: d.value, z: d.value }))
    }]
  }
}
