import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { SearchActivityButtonComponent } from '../input/search-activity-button/search-activity-button.component';
import { ActivityCheckboxSelectorComponent } from '../input/activity-checkbox-selector/activity-checkbox-selector.component';
import { RoutingCheckboxSelectorComponent } from '../input/routing-checkbox-selector/routing-checkbox-selector.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';
import { AppDateRangePicker } from '../datepicker/date-range-picker/date-range-picker.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import { Router } from '@angular/router';
import ApiMapbox from 'src/api/mapbox';
import DrinkDto from 'src/dto/drink.dto';
import ApiTrip from 'src/api/apiTrip';
import TripDto from 'src/dto/trip.dto';
import auth from 'src/api/auth';

type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';
type routing_type = 'driving' | 'walking' | 'cycling';

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
export class TripWithInterestPointsContainerComponent implements OnInit {
  depart: [lat: number, lon: number] | null = null;
  arrive: [lat: number, lon: number] | null = null;
  trip: any | null = {
    routes: [],
    waypoints: [{ location: [-1.681558, 48.113247] }, { location: [2.348424, 48.853484] }],
  };
  center: { lat: number; lng: number } = { lat: 0, lng: 0 };
  distance: number = 0;
  points: Array<{ name: string; coordinates: number[]; description?: string }> = [];
  activities: any[] | null = null;
  activityType: ActivityType = 'enjoy';
  routing_type: string = 'driving';
  range: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  listInterestActivities: DrinkDto[] = [];
  user: any;
  userConnected: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  async ngOnInit() {
    console.log('TripWithInterestPointsContainerComponent');

    try {
      const responce = await auth.getUserInfo();
      if (responce.status === 200) {
        const user = responce.data;
        this.userConnected = true;
      }
    } catch (error) {}
  }

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
    this.activities = null;
  }
  clearDestination() {
    this.arrive = null;
    this.trip.routes = [];
    this.points = [];
    this.activities = null;
  }

  async searchTrip() {
    if (this.depart && this.arrive) {
      try {
        const newTrip = await ApiMapbox.getTrip(this.depart, this.arrive, this.routing_type);
        if (newTrip) {
          this.trip = null;
          this.cdr.detectChanges();
          this.trip = newTrip;
        }
      } catch (error: any) {
        console.error('Error: ', error);
      }
    }
  }

  setPoints(events: any) {
    // this.center = event;
    this.activities = events;
    const points = events.map((feature: DrinkDto) => {
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

  setrouting_type(event: string) {
    this.routing_type = event as routing_type;
    this.searchTrip();
  }

  get activitiesNotInListInterestActivities() {
    return this.activities?.filter((activity) => !this.listInterestActivities.includes(activity));
  }

  addInterestActivity(event: any) {
    // check if already in list
    if (this.listInterestActivities.includes(event)) {
      return;
    }
    this.listInterestActivities.push(event);
  }
  removeInterestActivity(event: any) {
    this.listInterestActivities = this.listInterestActivities.filter((activity) => activity !== event);
  }

  async createTrip() {
    const activitiesCleaned = this.listInterestActivities.map((activity) => {
      return {
        ...activity,
        description: activity.description?.replace(/<[^>]*>?/gm, ''),
      };
    });

    const trip = new TripDto({
      range: this.range,
      depart: this.depart,
      depart_name: this.trip.waypoints[0].name,
      arrive: this.arrive,
      arrive_name: this.trip.waypoints[1].name,
      routing_type: this.routing_type,
      activities: activitiesCleaned,
    });
    if (!trip) {
      return;
    }
    try {
      const newTrip = await ApiTrip.createTrip(trip);
      if (newTrip) {
        this.router.navigate(['/user-trips']);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
