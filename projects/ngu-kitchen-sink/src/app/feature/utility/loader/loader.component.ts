import { Component } from '@angular/core'
import { LoaderService } from './loader.service'

@Component({
  selector: 'ngu-kitchensink-utility-loader',
  imports: [
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderUtilityComponent {
  constructor (private readonly loaderService: LoaderService) { }

  getData () {
    this.loaderService.getStarships().subscribe(r => {
      console.log(r)
    })
  }

  getNoLoaderHeaderData () {
    this.loaderService.getNoLoaderStarships().subscribe(r => {
      console.log(r)
    })
  }

  getNoLoaderUrlsData () {
    this.loaderService.getNoLoaderPlanets().subscribe(r => {
      console.log(r)
    })
  }
}
