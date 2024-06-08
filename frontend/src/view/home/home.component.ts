import type EnjoyDto from './../../api/dto/enjoy.dto';
import { Component, Input } from '@angular/core';
import { NavbarHomeComponent } from 'src/app/components/navbar-home/navbar-home.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { TabHomeComponent } from 'src/app/components/tab-home/tab-home.component';
import { CardPointInterrestComponent } from 'src/app/components/card-point-interrest/card-point-interrest.component';
import { PointsOfInterestContainerComponent } from 'src/app/components/points-of-interest-container/points-of-interest-container.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarHomeComponent,
    MapComponent,
    TabHomeComponent,
    FormsModule,
    CommonModule,
    CardPointInterrestComponent,
    PointsOfInterestContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  locations: EnjoyDto[] = [];
  points: any = [];
  lat: number = 0;
  lng: number = 0;
  constructor() {}

  onSendLocation(location: any) {
    this.locations = location;
    this.points = [];

    location.forEach((element: any) => {
      this.points.push({
        name: element.name,
        coordinates: [element.longitude, element.latitude],
      });
    });
  }

  onSendMapCenter(coordinates: any) {
    this.lat = coordinates.lat;
    this.lng = coordinates.lng;
  }
}
