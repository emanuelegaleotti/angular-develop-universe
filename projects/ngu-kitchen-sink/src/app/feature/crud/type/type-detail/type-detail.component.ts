import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TypeActions} from '../state/type.actions';
import {selectSelectedType} from '../state/type.selectors';

@Component({
  selector: 'app-type-detail',
  standalone: true,
  imports: [],
  templateUrl: './type-detail.component.html',
  styleUrl: './type-detail.component.scss',
})
export class TypeDetailComponent implements OnInit {
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private store = inject(Store);

  type = this.store.selectSignal(selectSelectedType);

  ngOnInit(): void {
    this.store.dispatch(TypeActions.selectType({name: this.offcanvasData()?.['name']}));
  }
}
