import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([ScatterChart, GridComponent, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-scatter',
  templateUrl: './chart-scatter.component.html',
  styleUrl: './chart-scatter.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartScatterComponent {
  readonly chartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{
      name: 'Sales',
      type: 'scatter',
      data: [[10, 8], [15, 12], [20, 18], [25, 22], [30, 28], [35, 31]],
      itemStyle: { color: '#88B04B' }
    }]
  }
}
