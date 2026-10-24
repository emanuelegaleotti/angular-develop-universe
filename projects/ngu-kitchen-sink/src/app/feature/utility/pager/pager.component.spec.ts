import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KSPagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: KSPagerComponent;
  let fixture: ComponentFixture<KSPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KSPagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KSPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
