import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';
import ApiMapbox from 'src/api/mapbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-with-interest-points-container',
  standalone: true,
  templateUrl: './trip-with-interest-points-container.component.html',
  styleUrl: './trip-with-interest-points-container.component.scss',
  imports: [InputAddressSuggestionComponent, MapTripComponent, CommonModule],
})
export class TripWithInterestPointsContainerComponent {
  depart: [lat: number, lon: number] | null = null;
  arrive: [lat: number, lon: number] | null = null;
  trip: any = null;
  center: { lat: number; lon: number } = { lat: 0, lon: 0 };
  distance: number = 0;

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
  }
  clearDestination() {
    this.arrive = null;
    this.trip = null;
  }

  async searchTrip() {
    if (this.depart && this.arrive) {
      try {
        this.trip = await ApiMapbox.getTrip(this.depart, this.arrive);
        this.cdr.detectChanges();
      } catch (error: any) {
        console.error('Error: ', error);
      }
    }
  }

  logAll() {
    console.log('depart: ', this.depart);
    console.log('arrive: ', this.arrive);
    console.log('trip: ', this.trip);
  }

  updateCenter(event: any) {
    console.log('event: ', event);
    this.center = event.center;
    this.distance = event.distance;
  }
}
