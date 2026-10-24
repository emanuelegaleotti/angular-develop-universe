import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

<<<<<<<< HEAD:projects/ngu-kitchen-sink/src/app/feature/utility/modal/modal.component.spec.ts
describe('OffcanvasComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
========
describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
>>>>>>>> main:projects/ngu-kitchen-sink/src/app/feature/chat/chat/chat.component.spec.ts

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
