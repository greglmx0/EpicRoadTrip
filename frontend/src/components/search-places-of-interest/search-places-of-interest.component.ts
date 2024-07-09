import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, Subject } from 'rxjs';
import ApiMapbox from '../../api/mapbox';
import ApiEnjoy from 'src/api/enjoy';

@Component({
  selector: 'app-search-places-of-interest',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
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

  constructor() {}

  ngOnInit() {
    this.subject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }

  async performSearch(searchValue: string) {
    console.log('lenght', searchValue.length);

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
    console.log('selectedType', this.selectedType);

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
            //  await this.getSleepRetrieve();
            throw new Error('Not implemented');
            break;
          case 'travel':
            // await this.getTravelRetrieve();
            throw new Error('Not implemented');
            break;
          case 'eat':
            // await this.getEatRetrieve();
            throw new Error('Not implemented');
            break;
          case 'drink':
            // await this.getDrinkRetrieve();
            throw new Error('Not implemented');
            break;
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async getEnjoyRetrieve() {
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

  selectType(type: any) {
    this.selectedType = type;
  }
}
