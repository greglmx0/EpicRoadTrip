import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map-point-interrest/map.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import EnjoyDto from 'src/dto/enjoy.dto';

@Component({
  selector: 'app-points-of-interest-container',
  standalone: true,
  imports: [CommonModule, MapComponent, CardPointInterrestComponent],
  templateUrl: './points-of-interest-container.component.html',
  styleUrl: './points-of-interest-container.component.scss',
})
export class PointsOfInterestContainerComponent {
  @Input() locations: EnjoyDto[] = [];
  @Input() lat: number = 0;
  @Input() lng: number = 0;

  get getPoints() {
    const points = [...this.locations];

    // TODO: filter points by latitude and longitude with function filter and not with a for loop

    // filter points by latitude and longitude to avoid duplicates
    const filterPoints = [];
    for (const point of points) {
      const lat = Number(point.latitude);
      const lng = Number(point.longitude);

      if (!filterPoints[lng + lng]) {
        filterPoints[lng + lat] = {
          name: point?.venue || point.name,
          coordinates: [lng, lat],
        };
      }
    }

    return Object.values(filterPoints);
  }
}
