import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core'
import { AbstractControl } from '@angular/forms'

interface StateRow {
  label: string
  value: string
  tone?: 'ok' | 'ko' | 'muted'
}

@Component({
  selector: 'article[ksControlState]',
  templateUrl: './control-state.component.html',
  styleUrl: './control-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlStateComponent {
  readonly control = input.required<AbstractControl>()
  private readonly version = signal(0)

  readonly disabled = computed(() => {
    this.version()
    return this.control().disabled
  })

  readonly rows = computed<StateRow[]>(() => {
    this.version()
    const c = this.control()
    const errors = c.errors ? Object.keys(c.errors).join(', ') : '—'
    return [
      { label: 'Valore', value: this.format(c.value) },
      { label: 'Valido', value: String(c.valid), tone: c.valid ? 'ok' : 'muted' },
      { label: 'Non valido', value: String(c.invalid), tone: c.invalid ? 'ko' : 'muted' },
      { label: 'Disabilitato', value: String(c.disabled), tone: 'muted' },
      { label: 'Toccato', value: String(c.touched), tone: 'muted' },
      { label: 'Modificato', value: String(c.dirty), tone: 'muted' },
      { label: 'Errori', value: errors, tone: c.errors ? 'ko' : 'muted' }
    ]
  })

  constructor () {
    effect((onCleanup) => {
      const sub = this.control().events.subscribe(() => this.version.update(v => v + 1))
      onCleanup(() => sub.unsubscribe())
    })
  }

  toggle (): void {
    const c = this.control()
    if (c.disabled) {
      c.enable()
    } else {
      c.disable()
    }
  }

  private format (value: unknown): string {
    if (value === null || value === undefined) return 'null'
    if (typeof File !== 'undefined' && value instanceof File) return value.name
    if (Array.isArray(value)) return `[${value.map(v => this.format(v)).join(', ')}]`
    if (typeof value === 'string') return `"${value}"`
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }
}
