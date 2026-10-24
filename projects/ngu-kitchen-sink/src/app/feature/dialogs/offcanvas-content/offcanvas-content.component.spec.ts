import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasContentComponent } from './offcanvas-content.component';

describe('OffcanvasContentComponent', () => {
  let component: OffcanvasContentComponent;
  let fixture: ComponentFixture<OffcanvasContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcanvasContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
