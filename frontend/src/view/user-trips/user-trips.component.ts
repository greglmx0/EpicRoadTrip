import { Component, OnInit } from '@angular/core';
import type Trip from './../../api/dto/trip.dto';
import { CommonModule } from '@angular/common';
import ApiTrip from 'src/api/apiTrip';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UserTripsComponent implements OnInit {
  trips: Trip[] = [];
  loading: boolean = false;

  async ngOnInit() {
    try {
      this.trips = (await ApiTrip.getUserTrips()) || [];
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
    }
  }
}