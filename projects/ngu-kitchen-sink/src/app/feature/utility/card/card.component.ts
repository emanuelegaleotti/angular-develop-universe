import { Component } from '@angular/core';
import {CardComponent} from "components";

@Component({
  selector: 'ngu-kitchensink-card',
  imports: [
    CardComponent
  ],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class KSCardComponent {

}
