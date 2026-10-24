import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWeekComponent } from './input-week.component';

describe('InputWeekComponent', () => {
  let component: InputWeekComponent;
  let fixture: ComponentFixture<InputWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
