import { Component } from '@angular/core'
// import { inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
// import { KeycloakStore } from 'angular-develop-universe/keycloak'

@Component({
  selector: 'ngu-kitchensink-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class HeaderComponent {
  // protected readonly store = inject(KeycloakStore)

  // isAuthenticated = this.store.isAuthenticated
  // user = this.store.user

  toggleAside(): void {
    // this.offcanvasService.open(AsideMobileComponent, { position: 'left', id: 'offcanvas-menu' })
  }

  // logout(): void {
  //   this.store.logout()
  // }
}
