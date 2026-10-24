import { Route } from '@angular/router'

export const routes:Route[] = [
  {
    path: 'dialog',
    loadComponent: () => import('./dialog/dialog.component').then((c) => c.DialogComponent)
  },
  {
    path: 'offcanvas',
    loadComponent: () => import('./offcanvas/offcanvas.component').then((c) => c.OffcanvasComponent)
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./bottom-sheet/bottom-sheet.component').then((c) => c.BottomSheetDemoComponent)
  },
  {
    path: 'toast',
    loadComponent: () => import('./toast/toast.component').then((c) => c.ToastDemoComponent)
  },
  {
    path: 'popover',
    loadComponent: () => import('./popover/popover.component').then((c) => c.PopoverDemoComponent)
  },
]
