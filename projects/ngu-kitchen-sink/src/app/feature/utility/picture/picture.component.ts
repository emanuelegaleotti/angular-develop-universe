import {Component} from '@angular/core';
import {PictureComponent} from "components";


@Component({
  selector: 'ngu-kitchensink-picture',
  imports: [
    PictureComponent
  ],
  standalone: true,
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss',
})
export class KSPictureComponent {
}
