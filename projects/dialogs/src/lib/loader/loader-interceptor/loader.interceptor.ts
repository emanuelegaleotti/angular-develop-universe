import { inject, Injectable, Injector } from '@angular/core'
import {
  HttpRequest, HttpErrorResponse, HttpHandlerFn, HttpEvent, HttpHandler, HttpInterceptor
} from '@angular/common/http'
import { catchError, finalize, Observable, throwError } from 'rxjs'
import { LoaderStore } from '../loader-state/loader.store'
import { NguDialogsConfig, NGU_DIALOGS_CONFIG } from '../../ngu-dialogs.model'


export function LoaderInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const loaderStore = inject(LoaderStore)
  const injector = inject(Injector)
  const config = injector.get<NguDialogsConfig>(NGU_DIALOGS_CONFIG)

  if (req.url.includes('/assets/i18n')) {
    return next(req)
  }

  switch (config.excludeLoader) {
    case 'headers':
      if (req.headers.has('No-Loader')) return next(req)
      break
    case 'urls':
      if (config.excludeLoaderUrls?.some(u => req.method === u.method && req.url.includes(u.url)))
        return next(req)
      break
  }

  loaderStore.open()
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => throwError(() => error)),
    finalize(() => loaderStore.close())
  )
}
