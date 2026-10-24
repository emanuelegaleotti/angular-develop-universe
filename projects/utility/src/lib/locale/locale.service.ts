import { Injectable } from '@angular/core'

import { distinctUntilChanged } from 'rxjs'
import { Localstorage } from '../enums/localstorage'
import { TranslocoService } from '@jsverse/transloco'
import { LocalStorageService } from 'ngx-webstorage'

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor (
    private readonly localStorage: LocalStorageService,
    private readonly translocoService: TranslocoService,
  ) { }

  getLocale (defaultLocale?: string): string {
    this.localStorage.observe(Localstorage.APP_LOCALE).pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      location.reload()
    })
    const l = this.localStorage.retrieve(Localstorage.APP_LOCALE) ?? (defaultLocale ?? 'en')
    this.translocoService.setActiveLang(l)
    return l
  }

  setLocale (l: string): void {
    this.localStorage.store(Localstorage.APP_LOCALE, l)
  }
}
