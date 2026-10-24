import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasContainerComponent } from './offcanvas-container.component';

describe('OffcanvasContainerComponent', () => {
  let component: OffcanvasContainerComponent;
  let fixture: ComponentFixture<OffcanvasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcanvasContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
