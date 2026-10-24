import { Component } from '@angular/core';
import {CarouselComponent} from "components";

@Component({
  selector: 'ngu-kitchensink-carousel',
  imports: [
    CarouselComponent
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  standalone: true
})
export class KSCarouselComponent {}
