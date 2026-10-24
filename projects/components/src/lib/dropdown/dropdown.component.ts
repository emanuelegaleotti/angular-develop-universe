import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, input, InputSignal, Signal } from '@angular/core'

@Component({
  selector: 'ngu-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DropdownComponent {
  id: InputSignal<string> = input.required<string>()
  label: InputSignal<string> = input<string>('')

  anchorName: Signal<string> = computed(() => `--${this.id()}`)

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef)

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close()
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    const details = this.host.nativeElement.querySelector('details')
    if (details?.open) {
      details.querySelector('summary')?.focus()
      this.close()
    }
  }

  private close(): void {
    this.host.nativeElement.querySelector('details')?.removeAttribute('open')
  }
}
