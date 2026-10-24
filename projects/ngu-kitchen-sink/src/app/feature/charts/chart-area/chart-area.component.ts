import { Component } from '@angular/core'
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, MarkAreaComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([LineChart, GridComponent, LegendComponent, MarkAreaComponent, TitleComponent, TooltipComponent, CanvasRenderer])

@Component({
  selector: 'ngu-kitchensink-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrl: './chart-area.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })]
})
export class ChartAreaComponent {
  readonly chartOptions: EChartsCoreOption = {
    backgroundColor: '#fff',
    // animation: false,
    title: {
      top: 0,
      text: 'Weekly sales',
      subtext: 'Actual compared with forecast',
      textStyle: { color: '#333333', fontSize: 18, fontWeight: 600 },
      subtextStyle: { color: '#777777', fontSize: 13 }
    },
    legend: {
      bottom: 10,
      data: ['Sales', 'Forecast'],
      selectedMode: false
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#f5ffeb',
      borderColor: '#88B04B',
      borderWidth: 1,
      padding: 12,
      textStyle: { color: '#333333', fontSize: 14 },
      axisPointer: {
        type: 'line',
        lineStyle: { color: '#88B04B', width: 1, type: 'dashed' }
      },
    },
    xAxis: {
      name: 'Day',
      nameLocation: 'middle',
      nameGap: 30,
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      splitLine: {
        show: true,
        lineStyle: { color: '#E0E0E0', type: 'dashed' }
      }
    },
    yAxis: {
      name: 'Sales',
      nameLocation: 'middle',
      nameGap: 30,
      position: 'left',
      type: 'value'
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: [120, 225, 150, 80, 70, 110, 110],
        areaStyle: {},
        itemStyle: { color: '#88B04B' },
        showSymbol: true,
        symbol: 'square',
        symbolSize: 8,
        lineStyle: { width: 3, type: 'solid' },
        markArea: {
          silent: true,
          itemStyle: { color: 'rgb(214 255 255 / 0.53)' },
          data: [[
            { name: 'Weekend', xAxis: 'Sat' },
            { xAxis: 'Sun' }
          ]]
        }
      },
      {
        name: 'Forecast',
        type: 'line',
        data: [100, 190, 170, 95, 85, 125, 145],
        areaStyle: { opacity: 0.25 },
        itemStyle: { color: '#d1eea5' }
      }
    ]
  }
}
