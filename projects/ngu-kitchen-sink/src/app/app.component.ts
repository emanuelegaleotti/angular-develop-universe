import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoaderStore } from 'angular-develop-universe/dialogs'
import { LoaderComponent } from './core/loader/loader.component'
import { AsideComponent } from './core/aside/aside.component'
import { HeaderComponent } from './core/header/header.component'
// import {IsAuthenticatedDirective} from "keycloak";

@Component({
  selector: 'ngu-kitchensink-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    AsideComponent,
    HeaderComponent,
    LoaderComponent
    // IsAuthenticatedDirective
  ]
})
export class AppComponent {
  protected readonly loaderStore = inject(LoaderStore)
  title: string = 'Angular Kitchen Sink'
}
