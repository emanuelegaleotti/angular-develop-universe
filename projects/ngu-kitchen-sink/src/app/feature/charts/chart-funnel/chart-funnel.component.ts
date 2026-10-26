import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { FunnelChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, legend, tooltip } from '../chart-theme'

echarts.use([FunnelChart, LegendComponent, TooltipComponent, CanvasRenderer])

const STEPS = [
  { value: 100, name: 'Visite' },
  { value: 72, name: 'Registrazioni' },
  { value: 48, name: 'Prova gratuita' },
  { value: 26, name: 'Abbonamenti' },
  { value: 12, name: 'Rinnovi' }
]

@Component({
  selector: 'ngu-kitchensink-chart-funnel',
  templateUrl: './chart-funnel.component.html',
  styleUrl: './chart-funnel.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/modules/funnel')] })
  ]
})
export class ChartFunnelComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item', { formatter: '{b}: {c}%' }),
    legend: legend(),
    series: [{
      type: 'funnel',
      top: 48,
      bottom: 16,
      left: '10%',
      width: '80%',
      min: 0,
      max: 100,
      sort: 'descending',
      gap: 4,
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      label: { show: true, position: 'inside', formatter: '{b}', color: '#fff' },
      data: STEPS
    }]
  }

  readonly pyramidChartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item', { formatter: '{b}: {c}%' }),
    series: [{
      type: 'funnel',
      top: 16,
      bottom: 16,
      left: '10%',
      width: '80%',
      sort: 'ascending',
      gap: 4,
      funnelAlign: 'center',
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      label: { show: true, position: 'right', color: '#413e46' },
      data: STEPS
    }]
  }

  readonly simpleHighchartsOptions: Options = {
    legend: { align: 'center', verticalAlign: 'top' },
    tooltip: { pointFormat: '{point.name}: <b>{point.y}%</b>' },
    plotOptions: { funnel: { showInLegend: true, neckWidth: '20%', neckHeight: '0%', borderColor: '#fff', borderWidth: 1 } },
    series: [{
      type: 'funnel',
      name: 'Conversione',
      width: '80%',
      dataLabels: { enabled: true, inside: true, format: '{point.name}', color: '#fff', softConnector: true },
      data: STEPS.map(s => ({ name: s.name, y: s.value }))
    }]
  }

  readonly pyramidHighchartsOptions: Options = {
    legend: { enabled: false },
    tooltip: { pointFormat: '{point.name}: <b>{point.y}%</b>' },
    plotOptions: { pyramid: { borderColor: '#fff', borderWidth: 1 } },
    series: [{
      type: 'pyramid',
      name: 'Conversione',
      width: '60%',
      reversed: true,
      dataLabels: { enabled: true, inside: false, format: '{point.name}', color: '#413e46', connectorColor: '#ccc9cf' },
      data: STEPS.map(s => ({ name: s.name, y: s.value }))
    }]
  }
}
