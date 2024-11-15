import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripWithInterestPointsContainerComponent } from '../../components/trip-with-interest-points-container/trip-with-interest-points-container.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
  imports: [CommonModule, FormsModule, TripWithInterestPointsContainerComponent],
  standalone: true,
})
export class TripComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
