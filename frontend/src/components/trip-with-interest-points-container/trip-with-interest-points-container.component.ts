import { Component, Input } from '@angular/core';
import { InputAddressSuggestionComponent } from '../input/input-address-suggestion/input-address-suggestion.component';

@Component({
  selector: 'app-trip-with-interest-points-container',
  standalone: true,
  templateUrl: './trip-with-interest-points-container.component.html',
  styleUrl: './trip-with-interest-points-container.component.scss',
  imports: [InputAddressSuggestionComponent],
})

export class TripWithInterestPointsContainerComponent {

  selectedLocation(event: any) {
    console.log(event);
  }

}
