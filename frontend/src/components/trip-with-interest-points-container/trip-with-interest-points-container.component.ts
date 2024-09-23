import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgModule } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import ApiMapbox from 'src/api/mapbox';
import DrinkDto from 'src/api/dto/drink.dto';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
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
  ],
})
export class TripWithInterestPointsContainerComponent {
  depart: [lat: number, lon: number] | null = null;
  arrive: [lat: number, lon: number] | null = null;
  trip: any | null = null;
  center: { lat: number; lng: number } = { lat: 0, lng: 0 };
  distance: number = 0;
  points: any[] | null = null;
  activity: any[] | null = null;
  activityType: ActivityType = 'enjoy';
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
    this.trip = null;
    this.points = null;
    this.activity = null;
  }
  clearDestination() {
    this.arrive = null;
    this.trip = null;
    this.points = null;
    this.activity = null;
  }

  async searchTrip() {
    console.log('searchTrip');
    if (this.depart && this.arrive) {
      try {
        this.trip = await ApiMapbox.getTrip(this.depart, this.arrive);
        console.log('trip: ', this.trip);
        this.cdr.detectChanges();
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

  // logAll() {
  //   this.toggleDrawer = !this.toggleDrawer;
  // }

  updateCenter(event: any) {
    this.center = event.center;
    this.distance = event.distance;
  }

  // async getDrinkRetrieve() {
  //   try {
  //     const data = await ApiDrink.getDrink(
  //       this.center.lat,
  //       this.center.lng,
  //       new Date().toISOString().split('T')[0].replace(/,/g, ''),
  //       new Date().toISOString().split('T')[0].replace(/,/g, ''),
  //       this.distance,
  //     );
  //     console.log('data: ', data);
  //     const points = data.map((feature: DrinkDto) => {
  //       return {
  //         name: feature.name,
  //         coordinates: [feature.longitude, feature.latitude],
  //         description: feature.description,
  //       };
  //     });
  //     this.points = points;
  //   } catch (error: any) {
  //     console.error('Error: ', error);
  //   }
  // }

  // searchDrink() {
  //   this.getDrinkRetrieve();
  // }

  setRange(event: any) {
    this.range = event;
  }

  setType(event: string) {
    console.log('event: ', event);
    this.activityType = event as ActivityType;
  }
}
