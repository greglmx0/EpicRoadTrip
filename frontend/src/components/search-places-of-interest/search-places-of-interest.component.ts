import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { debounceTime, Subject } from 'rxjs';
import ApiMapbox from '../../api/mapbox';
import ApiEnjoy from 'src/api/enjoy';
import ApiEat from 'src/api/ApiEat';
import ApiDrink from 'src/api/ApiDrink';
import ApiSleep from 'src/api/ApiSleep';

@Component({
  selector: 'app-search-places-of-interest',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, AppDateRangePicker],
  templateUrl: './search-places-of-interest.component.html',
  styleUrl: './search-places-of-interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPlacesOfInterestComponent {
  @Output() sendLocation = new EventEmitter();
  @Output() sendMapCenter = new EventEmitter();
  searchInputValue: string = '';
  searchResults: any[] = [];
  subject: Subject<any> = new Subject();
  selectedLocation: any = null;
  selectedLocationText: string = '';
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)
  typePointOfInterest: any[] = [
    {
      name: 'enjoy',
    },
    {
      name: 'sleep',
    },
    {
      name: 'travel',
    },
    {
      name: 'eat',
    },
    {
      name: 'drink',
    },
  ];
  failure: string = '';
  selectedType: string = '';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };

  constructor() {}

  ngOnInit() {
    this.subject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }

  async performSearch(searchValue: string) {
    if (searchValue.length < 3) {
      this.failure = 'Preciser votre recherche';
      this.searchResults = [{ name: 'Veuillez préciser votre recherche' }];

      return;
    } else {
      this.failure = '';
    }

    try {
      const response = (await ApiMapbox.getSuggestions(searchValue)) as any;

      if (response.status === 200) {
        this.searchResults = response.data;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async searchSuggestions(searchInput: string) {
    this.subject.next(searchInput);
  }

  async selectSuggestions(location: any) {
    this.selectedLocation = location;
    this.searchResults = []; // clear search results
    this.searchInputValue = `${this.selectedLocation.name} ${this.selectedLocation.place_formatted}`;
  }

  // retrieve = recuperer (la location subgerer)
  async serachRetrieve() {
    if (!this.selectedLocation) {
      this.failure = 'Rentrer une adresse valide';
      return;
    }
    if (!this.selectedType) {
      this.failure = "Choisir un type d'activité";
      return;
    }

    this.failure = '';

    try {
      const response = (await ApiMapbox.getRetrieve(this.selectedLocation.mapbox_id)) as any;

      if (response.status === 200) {
        this.selectedLocation = response.data;

        switch (this.selectedType) {
          case 'enjoy':
            await this.getEnjoyRetrieve();
            break;
          case 'sleep':
            await this.getSleepRetrieve();
            break;
          case 'travel':
            // await this.getTravelRetrieve();
            throw new Error('Not implemented');
            break;
          case 'eat':
            await this.getEatRetrieve();
            break;
          case 'drink':
            await this.getDrinkRetrieve();
            break;
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async getEnjoyRetrieve() {
    const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
    const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');

    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const enjoy = await ApiEnjoy.getEnjoy(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;

    this.sendLocation.emit(enjoy);
  }

  async getEatRetrieve() {
    const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
    const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');

    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const eat = await ApiEat.getEat(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;

    this.sendLocation.emit(eat);
  }

  async getDrinkRetrieve() {
    const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
    const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');

    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const drink = await ApiDrink.getDrink(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;

    this.sendLocation.emit(drink);
  }

  async getSleepRetrieve() {
    const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
    const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');

    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const sleep = await ApiSleep.getSleep(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;

    this.sendLocation.emit(sleep);
  }

  dateRange(event: { start: Date; end: Date }) {
    this.range = event;
  }

  selectType(type: any) {
    this.selectedType = type;
  }

  clearSelectedLocation() {
    this.selectedLocation = null;
    this.searchInputValue = '';
    this.selectedLocationText = '';
    this.sendLocation.emit([]);
    this.sendMapCenter.emit({ lat: 0, lng: 0 });
  }
}
