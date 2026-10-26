import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { PagerComponent } from 'angular-develop-universe/components'

@Component({
  selector: 'ks-crud-pager',
  standalone: true,
  imports: [PagerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './crud-pager.component.scss',
  template: `
    <ngu-pager
      [pageIndex]="pageIndex()"
      [totalItems]="totalItems()"
      [pageSize]="pageSize()"
      (whenPageSelected)="pageSelected.emit($event)">
      <ng-template #pagerFirstPageIcon>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z"/>
        </svg>
      </ng-template>
      <ng-template #pagerPrevPageIcon>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
        </svg>
      </ng-template>
      <ng-template #pagerNextPageIcon>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
        </svg>
      </ng-template>
      <ng-template #pagerLastPageIcon>
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z"/>
        </svg>
      </ng-template>
    </ngu-pager>
  `
})
export class CrudPagerComponent {
  readonly pageIndex = input.required<number>()
  readonly totalItems = input.required<number>()
  readonly pageSize = input.required<number>()
  readonly pageSelected = output<number>()
}
