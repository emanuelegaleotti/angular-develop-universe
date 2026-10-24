import {
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal,
  OnInit,
  Output,
  signal, TemplateRef,
  WritableSignal
} from '@angular/core'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {debounceTime, distinctUntilChanged} from 'rxjs'
import {TranslocoDirective} from '@jsverse/transloco'
import {NgClass, NgTemplateOutlet} from "@angular/common";
import {KBInformation} from "../model/knowledge-information";

@Component({
  selector: 'ngu-chat-knowledge-base',
  templateUrl: './chat-knowledge-base.component.html',
  styleUrl: './chat-knowledge-base.component.scss',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    NgClass,
    NgTemplateOutlet
  ]
})
export class ChatKnowledgeBaseComponent implements OnInit {
  knowledgeBases: InputSignal<KBInformation[]> = input<KBInformation[]>([])
  selectedKnowledgeBase: InputSignal<string[]> = input<string[]>([])
  filtersKnowledgeBase: WritableSignal<KBInformation[]> = signal<KBInformation[]>([])
  closeTemplateRef = input<TemplateRef<unknown> | null>()
  @Output() whenAddKnowledge: EventEmitter<string> = new EventEmitter<string>()
  @Output() whenRemoveKnowledge: EventEmitter<string> = new EventEmitter<string>()

  knowledgeForm: FormGroup = new FormGroup({
    base: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.observeForm()
  }

  get base(): FormControl {
    return this.knowledgeForm.controls['base'] as FormControl
  }

  observeForm(): void {
    this.knowledgeForm.controls['base'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      (value) => {
        if(value) {
          this.whenAddKnowledge.emit(value)
        }
      }
    )
  }
  constructor(){
    effect(() => {
      if (this.selectedKnowledgeBase().length){
        this.filtersKnowledgeBase.set(this.knowledgeBases().filter(kb => !this.selectedKnowledgeBase().includes(kb.contextId)))
      } else {
        this.filtersKnowledgeBase.set(this.knowledgeBases())
      }
    });
  }

  getBaseChip(id: string) {
    return this.knowledgeBases().find(k => k.contextId === id)?.displayName
  }

  handleRemove(id: string) {
    this.whenRemoveKnowledge.emit(id);
  }
}
