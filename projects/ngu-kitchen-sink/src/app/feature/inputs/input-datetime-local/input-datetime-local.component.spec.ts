import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatetimeLocalComponent } from './input-datetime-local.component';

describe('InputDatetimeLocalComponent', () => {
  let component: InputDatetimeLocalComponent;
  let fixture: ComponentFixture<InputDatetimeLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDatetimeLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDatetimeLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
