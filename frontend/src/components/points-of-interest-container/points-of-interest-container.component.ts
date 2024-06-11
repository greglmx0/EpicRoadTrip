import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { CardPointInterrestComponent } from '../card-point-interrest/card-point-interrest.component';
import EnjoyDto from 'src/api/dto/enjoy.dto';

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
    return points.map((element: any) => {
      return {
        name: element.name,
        coordinates: [element.longitude, element.latitude],
      };
    });
  }
}
