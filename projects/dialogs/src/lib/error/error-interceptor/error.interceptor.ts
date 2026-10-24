import { inject, Injectable, Injector } from '@angular/core'
import {
  HttpRequest, HttpErrorResponse, HttpHandlerFn, HttpEvent, HttpHandler, HttpInterceptor
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { NguDialogsConfig, NGU_DIALOGS_CONFIG } from '../../ngu-dialogs.model'
import { ErrorStore } from '../error-state/error.store'


export function ErrorInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const errorStore = inject(ErrorStore)
  const router = inject(Router)
  const injector = inject(Injector)
  const config = injector.get<NguDialogsConfig>(NGU_DIALOGS_CONFIG)


  if ( req.url.includes('/assets/i18n')) {
    return next(req)
  }

  switch (config.excludeError) {
    case 'headers':
      if (req.headers.has('No-Error')) return next(req)
      break
    case 'urls':
      if (config.excludeErrorUrls?.some(u => req.method === u.method && req.url.includes(u.url))) return next(req)
      break
  }

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      switch (e.status) {
        case 403:
          router.navigate(['/', '403'])
          break
        case 404:
          router.navigate(['/', '404'])
          break
        default:
          errorStore.storeError(e)
          errorStore.openDialog()
          break
      }
      return throwError(() => e)
    }),
  )
}
