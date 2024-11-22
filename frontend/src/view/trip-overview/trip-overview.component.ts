import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardPointInterrestComponent } from 'src/components/card-point-interrest/card-point-interrest.component';
import { MapTripComponent } from 'src/components/map/map-trip/map-trip.component';
import type TripDto from 'src/dto/trip.dto';
import ApiMapbox from 'src/api/mapbox';
import type { Route, Waypoint, MapBoxTrip } from 'src/dto/mapbox.dto';
import ApiTrip from 'src/api/apiTrip';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.css'],
  standalone: true,
  imports: [CommonModule, CardPointInterrestComponent, MapTripComponent],
})
export class TripOverviewComponent implements OnInit {
  loading = false;
  mapBoxTrip: MapBoxTrip | null = null;
  savedTrip: TripDto | null = null;
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    try {
      this.loading = true;
      // find trip id from route example: /trip/123 find 123
      const tripId = this.route.snapshot.paramMap.get('id');
      if (!tripId) {
        throw new Error('Trip id not found');
      }
      this.savedTrip = (await ApiTrip.getTrip(tripId)) || null;
      if (!this.savedTrip) {
        throw new Error('Trip not found');
      }
      this.mapBoxTrip = await ApiMapbox.getTrip(
        this.savedTrip.depart,
        this.savedTrip.arrive,
        this.savedTrip.routing_type,
      );
      if (!this.mapBoxTrip) {
        throw new Error('MapBox Trip not found');
      }
      console.log('Trip: ', this.mapBoxTrip);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
    }
  }
}
