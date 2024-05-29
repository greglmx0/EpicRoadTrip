import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.dev';
import { Component, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() points: any = [];
  map: mapboxgl.Map | undefined;
  lat: number = 48.1173;
  lng: number = -1.6778;

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 9,
      center: [this.lng, this.lat],
    });
  }

  // if point will be changed we need to update the map
  ngOnChanges() {
    console.log('update map', this.points);

    if (this.map) {
      // new mapboxgl.Marker()
      //   .setLngLat([this.points[0].lng, this.points[0].lat])
      //   .addTo(this.map);

      this.map.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.points.map(
            (point: { lng: any; lat: any; name: any }) => {
              console.log('point', point);
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [point.lng, point.lat],
                },
                properties: {
                  title: point.name,
                },
              };
            }
          ),
        },
      });
    }
  }
}
