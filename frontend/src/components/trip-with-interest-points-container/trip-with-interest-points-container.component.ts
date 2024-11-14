import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { RoutingCheckboxSelectorComponent } from '../input/routing-checkbox-selector/routing-checkbox-selector.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import ApiMapbox from 'src/api/mapbox';
import DrinkDto from 'src/api/dto/drink.dto';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
type RoutingType = 'driving' | 'walking' | 'cycling';
@Component({
  selector: 'app-trip-with-interest-points-container',
  standalone: true,
  templateUrl: './trip-with-interest-points-container.component.html',
  styleUrl: './trip-with-interest-points-container.component.scss',
  imports: [
    InputAddressSuggestionComponent,
    MapTripComponent,
    CommonModule,
    SearchActivityButtonComponent,
    AppDateRangePicker,
    ActivityCheckboxSelectorComponent,
    CardPointInterrestComponent,
    RoutingCheckboxSelectorComponent,
  ],
})
export class TripWithInterestPointsContainerComponent {
  depart: [lat: number, lon: number] | null = null;
  arrive: [lat: number, lon: number] | null = null;
  trip: any | null = {
    routes: [],
    waypoints: [{ location: [-1.681558, 48.113247] }, { location: [2.348424, 48.853484] }],
  };
  center: { lat: number; lng: number } = { lat: 0, lng: 0 };
  distance: number = 0;
  points: Array<{ name: string; coordinates: number[]; description?: string }> = [];
  activity: any[] | null = null;
  activityType: ActivityType = 'enjoy';
  routingType: string = 'driving';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  // toggleDrawer = false;

  constructor(private cdr: ChangeDetectorRef) {}

  selectedDeparture(event: any) {
    this.depart = event as [lat: number, lon: number];
    this.searchTrip();
  }
  selectedDestination(event: any) {
    this.arrive = event as [lat: number, lon: number];
    this.searchTrip();
  }
  clearDeparture() {
    this.depart = null;
    this.trip.routes = [];
    this.points = [];
    this.activity = null;
  }
  clearDestination() {
    this.arrive = null;
    this.trip.routes = [];
    this.points = [];
    this.activity = null;
  }

  async searchTrip() {
    console.log('searchTrip');
    if (this.depart && this.arrive) {
      try {
        const newTrip = await ApiMapbox.getTrip(this.depart, this.arrive, this.routingType);
        if (newTrip) {
          this.trip = null;
          this.cdr.detectChanges();
          this.trip = newTrip;
        }
        // driving | walking | cycling
        // console.log('trip: ', this.trip);
      } catch (error: any) {
        console.error('Error: ', error);
      }
    }
  }

  setPoints(event: any) {
    // this.center = event;
    this.activity = event;
    const points = event.map((feature: DrinkDto) => {
      return {
        name: feature.name,
        coordinates: [feature.longitude, feature.latitude],
        description: feature.description,
      };
    });
    this.points = points;
  }

  updateCenter(event: any) {
    this.center = event.center;
    this.distance = event.distance;
  }

  setRange(event: any) {
    this.range = event;
  }

  setActivityType(event: string) {
    this.activityType = event as ActivityType;
  }

  setRoutingType(event: string) {
    this.routingType = event as RoutingType;
    this.searchTrip();
  }
}
