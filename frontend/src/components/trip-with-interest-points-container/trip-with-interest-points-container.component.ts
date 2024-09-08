import { Component, Input } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';
import { MapTripComponent } from '../map/map-trip/map-trip.component';

@Component({
  selector: 'app-trip-with-interest-points-container',
  standalone: true,
  templateUrl: './trip-with-interest-points-container.component.html',
  styleUrl: './trip-with-interest-points-container.component.scss',
  imports: [InputAddressSuggestionComponent, MapTripComponent],
})
export class TripWithInterestPointsContainerComponent {
  mapboxIdDeparture: string = '';
  mapboxIdDestination: string = '';
  selectedDeparture(event: any) {
    console.log('selectedDeparture event: ', event);
    this.mapboxIdDeparture = event as string;
  }
  selectedDestination(event: any) {
    console.log('selectedDestination event: ', event);
    this.mapboxIdDestination = event as string;
  }
}
