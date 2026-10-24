import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatalistObjectComponent } from './input-datalist-object.component';

describe('InputDatalistObjectComponent', () => {
  let component: InputDatalistObjectComponent;
  let fixture: ComponentFixture<InputDatalistObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDatalistObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDatalistObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
