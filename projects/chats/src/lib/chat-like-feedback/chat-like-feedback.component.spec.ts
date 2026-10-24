import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLikeFeedbackComponent } from './chat-like-feedback.component';

describe('ChatLikeFeedbackComponent', () => {
  let component: ChatLikeFeedbackComponent;
  let fixture: ComponentFixture<ChatLikeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLikeFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLikeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
