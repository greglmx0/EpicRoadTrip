import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  @Input() points: Array<{ name: string; coordinates: number[] }> = [];
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  style = 'mapbox://styles/mapbox/streets-v11';

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 11,
      center: [this.lng, this.lat],
    });

    this.map.on('load', () => {
      this.map?.addSource('Rennes Points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.points.map((point) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: point.coordinates,
              },
              properties: {
                title: point.name,
              },
            };
          }) as any,
        },
      });

      this.map?.addLayer({
        id: 'Rennes Points',
        type: 'circle', // circle marker types
        source: 'Rennes Points', // reference the data source
        layout: {},
        paint: {
          'circle-color': 'blue',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white',
        },
      });
    });
  }
}
