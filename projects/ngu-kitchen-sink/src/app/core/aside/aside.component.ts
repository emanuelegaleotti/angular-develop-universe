import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
    selector: 'ngu-kitchensink-aside',
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class AsideComponent {

}
