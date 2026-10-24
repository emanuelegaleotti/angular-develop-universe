import { Component, signal } from '@angular/core'
import { injectQuery } from '@tanstack/angular-query-experimental'
import { StarshipsService } from '../starships.service'
import { lastValueFrom } from 'rxjs'
import { PagerComponent } from 'angular-develop-universe/components'


@Component({
    selector: 'ngu-kitchensink-tanstack',
    imports: [
        PagerComponent
    ],
    templateUrl: './tanstack.component.html',
    styleUrl: './tanstack.component.scss'
})
export class TanstackComponent {
  page = signal(1)
  constructor (
    private readonly starshipsService: StarshipsService
  ) {}

  query = injectQuery(() => ({
    queryKey: ['tanstack', this.page()],
    queryFn: () => lastValueFrom(this.starshipsService.getStarships(this.page())),
  }))

}
