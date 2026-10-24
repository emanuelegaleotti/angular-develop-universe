import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([PieChart, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartPieComponent {
  readonly chartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    tooltip: { trigger: 'item' },
    series: [{
      name: 'Sales',
      type: 'pie',
      data: [
        { value: 335, name: 'Product A', itemStyle: { color: '#88B04B' } },
        { value: 234, name: 'Product B' },
        { value: 154, name: 'Product C' }
      ]
    }]
  }
}
