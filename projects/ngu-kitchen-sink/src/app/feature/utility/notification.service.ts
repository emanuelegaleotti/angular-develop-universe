import { Injectable } from '@angular/core'
import { from, map, Observable, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification?: Notification

  constructor () { }

  initNotification (): Observable<boolean> {
    if (!('Notification' in window)) {
      return of(false)
    }
    if (Notification.permission !== 'denied') {
      return from(Notification.requestPermission()).pipe(
        switchMap((permission) => {
          if (permission !== 'granted') {
            return of(false)
          }
          return of(true)
        })
      )
    }
    return of(true)
  }

  sendNotification (message: string): void {
    this.notification = new Notification(message)
  }

  closeNotification (): void {
    if (this.notification) {
      this.notification.close()
    }
  }
}
