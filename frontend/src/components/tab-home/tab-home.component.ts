import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPlacesOfInterestComponent } from '../search-places-of-interest/search-places-of-interest.component';
import { TripWithInterestPointsContainerComponent } from '../trip-with-interest-points-container/trip-with-interest-points-container.component';

@Component({
  selector: 'app-tab-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPlacesOfInterestComponent, TripWithInterestPointsContainerComponent],
  templateUrl: './tab-home.component.html',
  styleUrl: './tab-home.component.scss',
})
export class TabHomeComponent {}
