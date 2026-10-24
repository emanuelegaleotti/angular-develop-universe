import { Route } from '@angular/router'

export const routes: Route[] = [
  {
    path: 'buttons',
    loadComponent: () => import('./buttons/buttons.component').then((c) => c.ButtonsComponent)
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./dropdown/dropdown.component').then((c) => c.KSDropdownComponent)
  }
  ]
