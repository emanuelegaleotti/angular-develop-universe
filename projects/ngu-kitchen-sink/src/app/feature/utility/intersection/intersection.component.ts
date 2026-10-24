import { Component } from '@angular/core'
import { IntersectionDirective } from '../intersection.directive'

@Component({
    selector: 'ngu-kitchensink-intersection',
    imports: [
        IntersectionDirective
    ],
    templateUrl: './intersection.component.html',
    styleUrl: './intersection.component.scss'
})
export class IntersectionComponent {
  list = Array(200).map((e, i) => i)

  log (index: number, event: string) {
    console.log(`${index} - ${event}`)
  }
}
