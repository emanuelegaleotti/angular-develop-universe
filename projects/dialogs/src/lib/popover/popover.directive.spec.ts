import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NguPopoverDirective } from './popover.directive'

@Component({
  imports: [NguPopoverDirective],
  template: `
    <button type="button" class="trigger" nguPopoverId="test-popover" [nguPopover]="content" nguPopoverPosition="top">Open</button>
    <ng-template #content><span class="inner">Hello</span></ng-template>
  `
})
class HostComponent {}

describe('NguPopoverDirective', () => {
  let fixture: ComponentFixture<HostComponent>
  let trigger: HTMLButtonElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents()
    fixture = TestBed.createComponent(HostComponent)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    trigger = fixture.nativeElement.querySelector('.trigger')
  })

  afterEach(() => fixture.nativeElement.remove())

  it('should create an auto popover linked to the trigger', () => {
    const popover: HTMLElement = fixture.nativeElement.querySelector('.ngu-popover')
    expect(popover.getAttribute('popover')).toBe('auto')
    expect(popover.id).toBe('test-popover')
    expect(trigger.getAttribute('popovertarget')).toBe('test-popover')
  })

  it('should render the template inside the popover', () => {
    expect(fixture.nativeElement.querySelector('.ngu-popover .inner')?.textContent).toBe('Hello')
  })

  it('should expose the requested position as data attribute', () => {
    const popover: HTMLElement = fixture.nativeElement.querySelector('.ngu-popover')
    expect(popover.getAttribute('data-position')).toBe('top')
  })

  it('should remove the popover on destroy', () => {
    fixture.destroy()
    expect(document.querySelector('.ngu-popover')).toBeNull()
  })
})
