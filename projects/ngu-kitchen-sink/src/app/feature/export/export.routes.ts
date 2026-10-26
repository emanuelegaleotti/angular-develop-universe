import { Route } from '@angular/router'

export const routes: Route[] = [
  {
    path: 'csv',
    loadComponent: () => import('./csv/csv.component').then((c) => c.CsvComponent)
  },
  {
    path: 'pdf',
    loadComponent: () => import('./pdf/pdf.component').then((c) => c.PdfComponent)
  }
]
