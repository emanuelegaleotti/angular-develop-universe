import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { switchMap } from 'rxjs'
import { CognitoService } from '../cognito.service'

export const cognitoInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return inject(CognitoService).checkLogin().pipe(
    switchMap((r) => {
      if (r.tokens) {
        const cr = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${r.tokens?.['accessToken'].toString()}`),
        })
        return next(cr)
      }
      return next(req)
    })
  )
}

