import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import ApiMapbox from '../../api/mapbox';
import ApiEnjoy from 'src/api/enjoy';

@Component({
  selector: 'app-search-places-of-interest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-places-of-interest.component.html',
  styleUrl: './search-places-of-interest.component.scss',
})
export class SearchPlacesOfInterestComponent {
  @Output() sendLocation = new EventEmitter();
  @Output() sendMapCenter = new EventEmitter();
  searchInputValue: string = '';
  searchResults: any[] = [];
  subject: Subject<any> = new Subject();
  selectedLocation: any = null;
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)
  pointofinterest: any = [
    {
      name: 'enjoy',
      checked: true,
    },
    {
      name: 'sleep',
      checked: true,
    },
    {
      name: 'travel',
      checked: false,
    },
    {
      name: 'eat',
      checked: false,
    },
    {
      name: 'drink',
      checked: false,
    },
  ];
  failure: string = '';

  constructor() {}

  ngOnInit() {
    this.subject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  async performSearch(searchValue: string) {
    if (searchValue.length < 3) {
      this.searchResults = [];
      this.failure = 'Veuillez saisir au moins 3 caractères';
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
      this.failure = 'Recherchez une location';
    }

    try {
      const response = (await ApiMapbox.getRetrieve(
        this.selectedLocation.mapbox_id,
      )) as any;

      if (response.status === 200) {
        this.selectedLocation = response.data;
        await this.sendMapCenterToParent();
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async sendMapCenterToParent() {
    await this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const enjoy = await ApiEnjoy.getEnjoy(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      '2024-06-01',
      '2024-12-31',
    );

    this.sendLocation.emit(enjoy);
  }
}
