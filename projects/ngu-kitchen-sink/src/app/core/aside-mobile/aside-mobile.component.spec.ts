import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMobileComponent } from './aside-mobile.component';

<<<<<<<< HEAD:projects/ngu-kitchen-sink/src/app/feature/utility/modal/modal-content/modal-content.component.spec.ts
describe('OffcanvasContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
========
describe('AsideMobileComponent', () => {
  let component: AsideMobileComponent;
  let fixture: ComponentFixture<AsideMobileComponent>;
>>>>>>>> main:projects/ngu-kitchen-sink/src/app/core/aside-mobile/aside-mobile.component.spec.ts

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
