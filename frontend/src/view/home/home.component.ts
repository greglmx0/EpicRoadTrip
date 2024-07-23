import type EnjoyDto from './../../api/dto/enjoy.dto';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavbarHomeComponent } from 'src/components/navbar-home/navbar-home.component';
import { MapComponent } from 'src/components/map/map.component';
import { TabHomeComponent } from 'src/components/tab-home/tab-home.component';
import { CardPointInterrestComponent } from 'src/components/card-point-interrest/card-point-interrest.component';
import { PointsOfInterestContainerComponent } from 'src/components/points-of-interest-container/points-of-interest-container.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarHomeComponent, TabHomeComponent, PointsOfInterestContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  locations: EnjoyDto[] = [];
  points: any = [];
  lat: number = 0;
  lng: number = 0;
  constructor() {}

  createMarker(point: any) {
    console.log('point', point);
    if (!point) {
      throw new Error('No point to create marker');
    }
    point.forEach((element: any) => {
      // check if the element already exists in the array (lat, lng)
      const exists = this.points.some((el: any) => {
        return el.coordinates[0] === element.longitude && el.coordinates[1] === element.latitude;
      });

      if (exists) {
        return;
      }

      this.points.push({
        name: element.name,
        coordinates: [element.longitude, element.latitude],
      });
    });
  }

  initMap() {
    this.points = [];
    this.locations = [];
  }

  onSendLocation(location: any) {
    this.initMap();
    this.locations = location;
    this.createMarker(location);
  }

  onSendMapCenter(coordinates: any) {
    this.lat = coordinates.lat;
    this.lng = coordinates.lng;
  }
}
