import { Component, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import ApiMapbox from 'src/api/mapbox';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';
import { PointsOfInterestContainerComponent } from 'src/components/points-of-interest-container/points-of-interest-container.component';

@Component({
  selector: 'app-search-places-of-interest',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppDateRangePicker,
    InputAddressSuggestionComponent,
    ActivityCheckboxSelectorComponent,
    SearchActivityButtonComponent,
    PointsOfInterestContainerComponent,
  ],
  templateUrl: './search-places-of-interest.component.html',
  styleUrl: './search-places-of-interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPlacesOfInterestComponent {
  selectedLocationLatLng: { lat: number; lng: number } | null = null;
  activityType: ActivityType = 'enjoy';

  // failure: string = '';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  loading: boolean = false;

  locations: any[] = [];
  lat: number | null = null;
  lng: number | null = null;

  constructor(
    private cdr: ChangeDetectorRef, // ChangeDetectorRef is a service that comes with Angular that helps us to manually trigger the change detection process
  ) {}

  async ngOnInit() {}

  async selectLocation(latLng: number[]) {
    console.log('selectLocation', latLng);

    this.selectedLocationLatLng = { lat: latLng[1], lng: latLng[0] };
    this.lat = latLng[0];
    this.lng = latLng[1];
  }

  dateRange(event: { start: Date; end: Date }) {
    this.range = event;
  }

  clearSelectedLocation() {
    this.selectedLocationLatLng = null;
    this.lat = null;
    this.lng = null;
    this.locations = [];
  }

  setType(type: any) {
    if (['enjoy', 'sleep', 'travel', 'eat', 'drink'].includes(type)) {
      this.activityType = type as ActivityType;
    }
  }

  setPoints(points: any) {
    this.locations = points;
  }
}
