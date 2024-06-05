import { Component, Input } from '@angular/core';
import { NavbarHomeComponent } from 'src/app/components/navbar-home/navbar-home.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { TabHomeComponent } from 'src/app/components/tab-home/tab-home.component';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  points: any = [];
  lat: number = 0;
  lng: number = 0;
  constructor() {}

  onSendLocation(location: any) {
    this.points = [];

    location.forEach((element: any) => {
      this.points.push({
        name: element.name,
        coordinates: [element.latitude, element.longitude],
      });
    });
  }

  onSendMapCenter(coordinates: any) {
    this.lat = coordinates.lat;
    this.lng = coordinates.lng;
  }
}
