import { Routes } from '@angular/router'
// import { MsalGuard } from '@azure/msal-angular'

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home/home.component').then(c => c.HomeComponent),
    // canActivate: [MsalGuard]
  },
  { path: 'inputs', loadChildren: () => import('./feature/inputs/inputs.routes').then(m => m.inputsRoutes) },
  { path: 'charts', loadChildren: () => import('./feature/charts/charts.routes').then(m => m.chartsRoutes) },
  { path: 'utility', loadChildren: () => import('./feature/utility/utility.routes').then(m => m.routes) },
  { path: 'chat', loadChildren: () => import('./feature/chat/chat.routes').then(m => m.routes) },
  { path: 'design', loadChildren: () => import('./feature/design/design.routes').then(m => m.routes) },
  { path: 'export', loadChildren: () => import('./feature/export/export.routes').then(m => m.routes) },
  { path: 'dialogs', loadChildren: () => import('./feature/dialogs/dialogs.routes').then(m => m.routes) },
  { path: 'crud', loadChildren: () => import('./feature/crud/crud.routes').then(m => m.CRUD_ROUTES) },
]


