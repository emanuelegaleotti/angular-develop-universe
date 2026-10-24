import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatKnowledgeBaseComponent } from './chat-knowledge-base.component';

describe('ChatKnowledgeBaseComponent', () => {
  let component: ChatKnowledgeBaseComponent;
  let fixture: ComponentFixture<ChatKnowledgeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatKnowledgeBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatKnowledgeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
