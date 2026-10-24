import { Component, inject, Inject, OnInit } from '@angular/core'
import { NotificationService } from '../notification.service'
import { PushNotificationService } from '../push-notification.service'
import { environment } from '../../../../environments/environment'

@Component({
    selector: 'ngu-kitchensink-notification',
    imports: [],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService)
  private pushNotificationService = inject(PushNotificationService)

  ngOnInit () {
    this.notificationService.initNotification().subscribe(() => {
      console.log('notification ready')
    })
    this.pushNotificationService.initPushNotification().subscribe(() => {
      console.log('push notification ready')
    })
  }

  send (): void {
  this.notificationService.sendNotification('test')
  }

  register(): void {
    this.pushNotificationService.subscribeToNotifications(environment.publicKey)
  }
}
