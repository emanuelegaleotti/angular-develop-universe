import { Injectable } from '@angular/core'
import { SwPush } from '@angular/service-worker'
import { from, Observable, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor (
    private swPush: SwPush,
  ) {}

  initPushNotification (): Observable<boolean> {
    if (!('serviceWorker' in navigator)) {
      return of(false)
    }
    if (!('PushManager' in window)) {
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

  subscribeToNotifications (key: string) {
    return from(this.swPush.requestSubscription({
        serverPublicKey: key
      })
    )
  }
}
