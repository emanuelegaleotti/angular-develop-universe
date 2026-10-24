import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageAiComponent } from './chat-message-ai.component';

describe('ChatMessageAiComponent', () => {
  let component: ChatMessageAiComponent;
  let fixture: ComponentFixture<ChatMessageAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageAiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
