import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartBarComponent {
  readonly chartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Sales',
      type: 'bar',
      data: [120, 225, 150, 80, 70, 110, 130],
      itemStyle: { color: '#88B04B' }
    }]
  }
}
