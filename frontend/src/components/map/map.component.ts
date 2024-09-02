import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  @Input() points: Array<{ name: string; coordinates: number[]; description?: string }> = [];
  @Input() lat: number = 48.1113;
  @Input() lng: number = -1.6774;
  style = 'mapbox://styles/mapbox/streets-v12';

  constructor() {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
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
                description: point.name,
              },
            };
          }) as any,
        },
      });

      this.map?.addLayer({
        id: 'Rennes Points',
        type: 'circle',
        source: 'Rennes Points',
        layout: {},
        paint: {
          'circle-color': 'blue',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white',
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.map?.on('mouseenter', 'Rennes Points', (e: any) => {
        if (!this.map) {
          console.log('map is not here');
        }
        this.map!.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map!);
      });

      this.map?.on('mouseleave', 'Rennes Points', () => {
        this.map!.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }
}
