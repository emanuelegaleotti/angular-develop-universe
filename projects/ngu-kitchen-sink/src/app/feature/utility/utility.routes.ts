import { Route } from '@angular/router'
import { IntersectionComponent } from './intersection/intersection.component'
import {KSPictureComponent} from "./picture/picture.component";
import {KSPagerComponent} from "./pager/pager.component";
import {KSCarouselComponent} from "./carousel/carousel.component";
import {KSCardComponent} from "./card/card.component";

export const routes: Route[] = [
  { path: 'intersection', component: IntersectionComponent },
  {
    path: 'notification',
    loadComponent: () => import('./notification/notification.component').then((c) => c.NotificationComponent)
  },
  {
    path: 'loader',
    loadComponent: () => import('./loader/loader.component').then((c) => c.LoaderUtilityComponent)
  },
  { path: 'carousel', component: KSCarouselComponent},
  { path: 'picture', component: KSPictureComponent},
  { path: 'pager', component: KSPagerComponent},
  { path: 'card', component: KSCardComponent},

]
