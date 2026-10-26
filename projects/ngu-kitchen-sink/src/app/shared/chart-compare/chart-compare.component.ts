import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'article[ksChartCompare]',
  templateUrl: './chart-compare.component.html',
  styleUrl: './chart-compare.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCompareComponent {
  readonly heading = input.required<string>()
}
