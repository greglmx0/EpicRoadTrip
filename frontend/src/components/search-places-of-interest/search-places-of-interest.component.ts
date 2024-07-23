import { Component, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { debounceTime, Subject } from 'rxjs';
import ApiMapbox from 'src/api/mapbox';
import ApiEnjoy from 'src/api/apiEnjoy';
import ApiEat from 'src/api/apiEat';
import ApiDrink from 'src/api/apiDrink';
import ApiSleep from 'src/api/apiSleep';
import ApiTravel from 'src/api/apiTravel';
import type EnjoyDto from 'src/api/dto/enjoy.dto';
import type TravelDto from 'src/api/dto/travel.dto';
import type SleepDto from 'src/api/dto/sleep.dto';
import type DrinkDto from 'src/api/dto/drink.dto';
import type EatDto from 'src/api/dto/eat.dto';
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
  selectedType: string = 'travel';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  loading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef, // ChangeDetectorRef is a service that comes with Angular that helps us to manually trigger the change detection process
  ) {}

  async ngOnInit() {
    this.subject.pipe(debounceTime(this.debounceTimeMs)).subscribe(async (searchValue) => {
      await this.performSearch(searchValue);
    });
  }

  async searchSuggestions(searchInput: string) {
    this.subject.next(searchInput);
  }

  async performSearch(searchValue: string) {
    console.log('searchValue: ', searchValue);

    if (searchValue.length < 3) {
      this.failure = 'Preciser votre recherche';
      this.searchResults = [{ name: 'Veuillez préciser votre recherche' }];
      this.cdr.detectChanges();
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
    } finally {
      this.cdr.detectChanges();
    }
  }

  async selectSuggestions(location: any) {
    this.selectedLocation = location;
    this.searchResults = []; // clear search results
    this.searchInputValue = `${this.selectedLocation.name} ${this.selectedLocation.place_formatted}`;
  }

  // retrieve = recuperer (la location subgerer)
  async serachRetrieve() {
    try {
      this.loading = true;
      if (!this.selectedLocation) {
        this.failure = 'Rentrer une adresse valide';
        return;
      }
      if (!this.selectedType) {
        this.failure = "Choisir un type d'activité";
        return;
      }
      this.failure = '';

      const response = (await ApiMapbox.getRetrieve(this.selectedLocation.mapbox_id)) as any;
      if (response.status === 200) {
        this.selectedLocation = response.data;

        const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
        const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');
        let retrieve: any;

        switch (this.selectedType) {
          case 'enjoy':
            retrieve = await this.getEnjoyRetrieve(start, end);
            break;
          case 'sleep':
            retrieve = await this.getSleepRetrieve(start, end);
            break;
          case 'travel':
            retrieve = await this.getTravelRetrieve(start, end);
            break;
          case 'eat':
            retrieve = await this.getEatRetrieve(start, end);
            break;
          case 'drink':
            retrieve = await this.getDrinkRetrieve(start, end);
            break;
        }

        if (retrieve && retrieve.length > 0) {
          this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;
          this.sendLocation.emit(retrieve);
        } else {
          this.selectedLocationText = '';
          this.failure = 'Aucun résultat trouvé';
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async getEnjoyRetrieve(start: string, end: string): Promise<EnjoyDto[]> {
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

    return enjoy;
  }

  async getEatRetrieve(start: string, end: string): Promise<EatDto[]> {
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
    return eat;
  }

  async getDrinkRetrieve(start: string, end: string): Promise<DrinkDto[]> {
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
    return drink;
  }

  async getSleepRetrieve(start: string, end: string): Promise<SleepDto[]> {
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
    return sleep;
  }

  async getTravelRetrieve(start: string, end: string): Promise<TravelDto[]> {
    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const travel = await ApiTravel.getTravel(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    return travel;
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
