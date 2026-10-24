import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDislikeFeedbackComponent } from './chat-dislike-feedback.component';

describe('ChatDislikeFeedbackComponent', () => {
  let component: ChatDislikeFeedbackComponent;
  let fixture: ComponentFixture<ChatDislikeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDislikeFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDislikeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
