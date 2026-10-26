import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular'
import * as echarts from 'echarts/core'
import { SankeyChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompareComponent } from '../../../shared/chart-compare/chart-compare.component'
import { chartBase, tooltip } from '../chart-theme'

echarts.use([SankeyChart, TooltipComponent, CanvasRenderer])

const NODES = ['Organico', 'Social', 'Email', 'Advertising', 'Landing', 'Catalogo', 'Carrello', 'Acquisto', 'Abbandono']
const LINKS: [string, string, number][] = [
  ['Organico', 'Landing', 40],
  ['Social', 'Landing', 25],
  ['Email', 'Catalogo', 18],
  ['Advertising', 'Landing', 32],
  ['Landing', 'Catalogo', 70],
  ['Landing', 'Abbandono', 27],
  ['Catalogo', 'Carrello', 52],
  ['Catalogo', 'Abbandono', 36],
  ['Carrello', 'Acquisto', 34],
  ['Carrello', 'Abbandono', 18]
]

@Component({
  selector: 'ngu-kitchensink-chart-sankey',
  templateUrl: './chart-sankey.component.html',
  styleUrl: './chart-sankey.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective, HighchartsChartDirective, ChartCompareComponent],
  providers: [
    provideEchartsCore({ echarts }),
    providePartialHighcharts({ modules: () => [import('highcharts/esm/modules/sankey')] })
  ]
})
export class ChartSankeyComponent {
  readonly chartOptions: EChartsCoreOption = {
    ...chartBase,
    tooltip: tooltip('item', { triggerOn: 'mousemove' }),
    series: [{
      type: 'sankey',
      left: 16,
      right: 120,
      top: 16,
      bottom: 16,
      nodeGap: 14,
      nodeWidth: 16,
      emphasis: { focus: 'adjacency' },
      lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.35 },
      label: { color: '#413e46' },
      data: NODES.map(name => ({ name })),
      links: LINKS.map(([source, target, value]) => ({ source, target, value }))
    }]
  }

  readonly highchartsOptions: Options = {
    legend: { enabled: false },
    chart: { marginRight: 96 },
    series: [{
      type: 'sankey',
      name: 'Percorso degli utenti',
      tooltip: {
        nodeFormat: '{point.name}: <b>{point.sum}</b>',
        pointFormat: '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}</b>'
      },
      keys: ['from', 'to', 'weight'],
      nodeWidth: 16,
      nodePadding: 14,
      linkOpacity: 0.35,
      colorByPoint: true,
      curveFactor: 0.5,
      dataLabels: { align: 'left', x: 22, overflow: 'allow', crop: false, style: { color: '#413e46', fontWeight: '400' } },
      nodes: NODES.map(id => ({ id, name: id })),
      data: LINKS
    }]
  }
}
