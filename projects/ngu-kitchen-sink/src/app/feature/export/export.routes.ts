import { Route } from '@angular/router'

export const routes: Route[] = [
  {
    path: 'csv',
    loadComponent: () => import('./csv/csv.component').then((c) => c.CsvComponent)
  }
]
