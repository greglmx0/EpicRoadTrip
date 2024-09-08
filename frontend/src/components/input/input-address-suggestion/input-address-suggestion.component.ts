import { Component, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import ApiMapbox from 'src/api/mapbox';

@Component({
  selector: 'app-input-address-suggestion',
  standalone: true,
  templateUrl: './input-address-suggestion.component.html',
  styleUrl: './input-address-suggestion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class InputAddressSuggestionComponent {
  @Output() sendAddress = new EventEmitter();
  searchInputValue: string = '';
  searchResults: any[] = [];
  subject: Subject<any> = new Subject();
  selectedLocation: any = null;
  selectedLocationText: string = '';
  private readonly debounceTimeMs = 300;
  failure: string = '';
  loading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subject.pipe(debounceTime(this.debounceTimeMs)).subscribe(async (value) => {
      if (value.length > 0) {
        this.searchResults = (await this.searchLocation(value)) as any;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  searchSuggestions(searchInput: string) {
    this.subject.next(searchInput);
  }

  async searchLocation(searchValue: string) {
    try {
      const response = await ApiMapbox.getSuggestions(searchValue);

      if (response.status === 200) {
        return response.data;
      } else {
        this.failure = response.data.message || 'An error occurred';
      }
    } catch (error: any) {
      this.failure = error.message || 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async selectSuggestions(location: any) {
    console.log('selectSuggestions location: ', location);

    this.selectedLocation = location;
    this.searchResults = []; // clear search results
    this.selectedLocationText = `${this.selectedLocation.name} ${this.selectedLocation.place_formatted}`;
    this.searchInputValue = `${this.selectedLocation.name} ${this.selectedLocation.place_formatted}`;
    console.log(location);

    const latLng = await this.getLatLng(location);
    console.log('selectSuggestions latLng: ', latLng);

    return latLng;
  }

  async getLatLng(location: any) {
    try {
      const response = await ApiMapbox.getRetrieve(location.mapbox_id);

      if (response.status === 200) {
        console.log('getLatLng response: ', response);

        return response.data[0]?.geometry?.coordinates;
      } else {
        this.failure = response.data.message || 'An error occurred';
      }
    } catch (error: any) {
      this.failure = error.message || 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  clearSelectedLocation() {
    this.selectedLocation = null;
    this.selectedLocationText = '';
  }
}
