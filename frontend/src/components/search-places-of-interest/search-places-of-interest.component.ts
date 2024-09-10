import { Component, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { debounceTime, Subject } from 'rxjs';
import ApiMapbox from 'src/api/mapbox';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';

@Component({
  selector: 'app-search-places-of-interest',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    AppDateRangePicker,
    InputAddressSuggestionComponent,
    ActivityCheckboxSelectorComponent,
    SearchActivityButtonComponent,
  ],
  templateUrl: './search-places-of-interest.component.html',
  styleUrl: './search-places-of-interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPlacesOfInterestComponent {
  @Output() sendLocation = new EventEmitter();
  @Output() sendMapCenter = new EventEmitter();
  selectedLocationLatLng: { lat: number; lng: number } = { lat: 0, lng: 0 };
  activityType: ActivityType = 'enjoy';

  // failure: string = '';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  loading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef, // ChangeDetectorRef is a service that comes with Angular that helps us to manually trigger the change detection process
  ) {}

  async ngOnInit() {}

  async selectLocation(latLng: number[]) {
    this.selectedLocationLatLng = { lat: latLng[0], lng: latLng[1] };
    this.sendMapCenter.emit(this.selectedLocationLatLng);
    console.log('selectedLocationLatLng', this.selectedLocationLatLng);
  }

  dateRange(event: { start: Date; end: Date }) {
    this.range = event;
  }

  clearSelectedLocation() {
    this.selectedLocationLatLng = { lat: 0, lng: 0 };
    this.sendLocation.emit([]);
    this.sendMapCenter.emit({ lat: 0, lng: 0 });
  }

  selectedType(type: any) {
    if (['enjoy', 'sleep', 'travel', 'eat', 'drink'].includes(type)) {
      this.activityType = type as ActivityType;
    }
  }
}
