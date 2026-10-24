import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KSCarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: KSCarouselComponent;
  let fixture: ComponentFixture<KSCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KSCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KSCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
