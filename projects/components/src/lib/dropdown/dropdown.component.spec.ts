import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DropdownComponent } from './dropdown.component'

@Component({
  imports: [DropdownComponent],
  template: `<ngu-dropdown id="actions" label="Actions"><button type="button" class="item">Edit</button></ngu-dropdown>`
})
class HostComponent {}

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents()
    fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
  })

  it('should render the label in the summary', () => {
    const summary: HTMLElement = fixture.nativeElement.querySelector('summary')
    expect(summary.textContent?.trim()).toBe('Actions')
  })

  it('should use the id as anchor name', () => {
    const summary: HTMLElement = fixture.nativeElement.querySelector('summary')
    const menu: HTMLElement = fixture.nativeElement.querySelector('.ngu-dropdown-menu')
    expect(summary.style.getPropertyValue('anchor-name')).toBe('--actions')
    expect(menu.style.getPropertyValue('position-anchor')).toBe('--actions')
  })

  it('should project content into the menu', () => {
    expect(fixture.nativeElement.querySelector('.ngu-dropdown-menu .item')).toBeTruthy()
  })

  it('should close when clicking outside', () => {
    const details: HTMLDetailsElement = fixture.nativeElement.querySelector('details')
    details.open = true
    document.body.click()
    expect(details.open).toBeFalse()
  })
})
