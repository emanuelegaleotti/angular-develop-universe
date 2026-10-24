import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KSCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: KSCardComponent;
  let fixture: ComponentFixture<KSCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KSCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KSCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
