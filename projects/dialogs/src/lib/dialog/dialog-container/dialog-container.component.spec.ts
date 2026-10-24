import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContainerComponentTsComponent } from './dialog-container.component';

describe('DialogContainerComponentTsComponent', () => {
  let component: DialogContainerComponentTsComponent;
  let fixture: ComponentFixture<DialogContainerComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContainerComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContainerComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
