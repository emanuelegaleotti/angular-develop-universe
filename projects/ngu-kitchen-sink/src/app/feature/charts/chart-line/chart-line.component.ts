import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { AriaComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([LineChart, AriaComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartLineComponent {
  readonly simpleChartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{
      name: 'Sales',
      type: 'line',
      data: [120, 225, 150, 80, 70, 110, 130],
      itemStyle: { color: '#88B04B' }
    }]
  }

  readonly chartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    title: {
      text: 'U.S Solar Employment Growth',
      left: 'left'
    },
    tooltip: { trigger: 'axis' },
    legend: { top: 45 },
    grid: { top: 110, left: 70, right: 30, bottom: 65 },
    xAxis: {
      type: 'category',
      name: 'Year',
      data: Array.from({ length: 13 }, (_, index) => String(2010 + index))
    },
    yAxis: {
      type: 'value',
      name: 'Number of Employees'
    },
    aria: { show: true },
    series: [
      {
        name: 'Installation & Developers',
        type: 'line',
        data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610, 168960, 171558]
      },
      {
        name: 'Manufacturing',
        type: 'line',
        data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050, 33099, 33473]
      },
      {
        name: 'Sales & Distribution',
        type: 'line',
        data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663, 28978, 30618]
      },
      {
        name: 'Operations & Maintenance',
        type: 'line',
        data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077, 12530, 16585]
      },
      {
        name: 'Other',
        type: 'line',
        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073, 11471, 11648]
      }
    ]
  }
}
