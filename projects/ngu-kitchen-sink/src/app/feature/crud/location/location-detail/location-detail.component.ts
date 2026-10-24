import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {LocationStore} from '../location.store';
import {Location} from '../location.model';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent implements OnInit {
  protected locationStore = inject(LocationStore);
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  ngOnInit(): void {
    this.locationStore.selectLocation(this.offcanvasData()?.['name']);
  }

  getLocalName(loc: Location): string {
    return loc.names.find(n => n.language.name === 'en')?.name ?? loc.name;
  }
}
