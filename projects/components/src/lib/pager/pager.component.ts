import {
  Component,
  computed,
  ContentChild,
  effect,
  input,
  InputSignal,
  output,
  signal, TemplateRef,
  WritableSignal
} from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'ngu-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class PagerComponent {
  pageIndex:InputSignal<number> = input<number>(1)
  pageSize:InputSignal<number> = input<number>(10)
  totalItems:InputSignal<number> = input<number>(0)
  _currentPage:WritableSignal<number>= signal<number>(1)

  @ContentChild('pagerPrevPageIcon', { static: false }) prevPage: TemplateRef<any> | null = null
  @ContentChild('pagerFirstPageIcon', { static: false }) firstPage: TemplateRef<any> | null = null
  @ContentChild('pagerNextPageIcon', { static: false }) nextPage: TemplateRef<any> | null = null
  @ContentChild('pagerLastPageIcon', { static: false }) lastPage: TemplateRef<any> | null = null

  whenPageSelected = output<number>()

  pagesLength = computed(() => {
    const total = this.totalItems()
    const size = this.pageSize()
    if (!total || !size) return 0
    return total % size ? Math.floor(total / size) + 1 : total / size
  })

  pages = computed<number[]>(() => {
    const length = this.pagesLength()
    const current = this._currentPage()
    if (length <= 5) {
      return Array(length).fill(null).map((_, i) => i + 1)
    }
    const result: number[] = []
    let ignoredIndex = 0
    for (let i = current - 2; i <= current + 2; i++) {
      if (i > 0 && i <= length) {
        result.push(i)
      } else {
        ignoredIndex++
      }
    }
    for (let i = 1; i <= ignoredIndex; i++) {
      if (current > 2) {
        result.unshift(current - 2 - i)
      } else {
        result.push(current + 2 + i)
      }
    }
    return result
  })

  constructor () {
    effect(() => {
      const idx = this.pageIndex()
      if (idx) this._currentPage.set(idx)
    })
  }

  setPage (pn: number): void {
    this._currentPage.set(pn)
    this.whenPageSelected.emit(pn)
  }

  trackLink (i: number, _page: number): number {
    return i
  }
}
