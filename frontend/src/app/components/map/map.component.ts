import { environment } from '../../../environments/environment.dev';
import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  // style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 48.1173;
  lng: number = -1.6778;

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      // style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
  }
}
