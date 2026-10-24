import { ChangeDetectionStrategy, Component } from '@angular/core'
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'ngu-chat-empty',
  standalone: true,
  templateUrl: './chat-empty.component.html',
  styleUrl: './chat-empty.component.scss',
  imports: [
    TranslocoDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatEmptyComponent {}
