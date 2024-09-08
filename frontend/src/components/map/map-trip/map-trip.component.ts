import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-map-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-trip.component.html',
  styleUrls: ['./map-trip.component.scss'],
})
export class MapTripComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  @Input() points: Array<{ name: string; coordinates: number[]; description?: string }> = [];
  @Input() latlogDeparture: number[] = [-1.681558, 48.113247];
  @Input() latlogDestination: number[] = [2.348392, 48.853495];
  @Input() center: LngLatLike = [-1.681558, 48.113247];
  style = 'mapbox://styles/mapbox/streets-v12';

  routes = [
    {
      weight_name: 'auto',
      weight: 14984.274,
      duration: 13813.38,
      distance: 353532.312,
      legs: [
        {
          via_waypoints: [],
          admins: [
            {
              iso_3166_1_alpha3: 'FRA',
              iso_3166_1: 'FR',
            },
            {
              iso_3166_1_alpha3: 'FRA',
              iso_3166_1: 'FR',
            },
            {
              iso_3166_1_alpha3: 'FRA',
              iso_3166_1: 'FR',
            },
            {
              iso_3166_1_alpha3: 'FRA',
              iso_3166_1: 'FR',
            },
          ],
          weight: 14984.274,
          duration: 13813.38,
          steps: [],
          distance: 353532.312,
          summary: 'E 50, A 11',
        },
      ],
      geometry: {
        coordinates: [
          [-1.681135, 48.113473],
          [-1.6812, 48.113571],
          [-1.680761, 48.114307],
          [-1.681207, 48.114802],
          [-1.684462, 48.115234],
          [-1.685495, 48.113152],
          [-1.687205, 48.113655],
          [-1.681908, 48.120578],
          [-1.68969, 48.130779],
          [-1.690872, 48.132378],
          [-1.691207, 48.134343],
          [-1.693841, 48.137977],
          [-1.693667, 48.139288],
          [-1.600653, 48.14964],
          [-1.572823, 48.120779],
          [-1.181209, 48.069991],
          [-1.093059, 48.089827],
          [-0.929699, 48.075063],
          [-0.78182, 48.115861],
          [-0.642451, 48.075344],
          [-0.411606, 48.051245],
          [-0.28622, 48.007804],
          [-0.195484, 48.00273],
          [0.136451, 48.039945],
          [0.475039, 48.075812],
          [0.81661, 48.19194],
          [1.103831, 48.243031],
          [1.39521, 48.33488],
          [1.487513, 48.381465],
          [1.548725, 48.460953],
          [1.91009, 48.544276],
          [2.125044, 48.616205],
          [2.255857, 48.718583],
          [2.283097, 48.712572],
          [2.313273, 48.733547],
          [2.345573, 48.770934],
          [2.32971, 48.819294],
          [2.325719, 48.820253],
          [2.325412, 48.821914],
          [2.325892, 48.824698],
          [2.326898, 48.827774],
          [2.337249, 48.840913],
          [2.340846, 48.847336],
          [2.34492, 48.854336],
          [2.347773, 48.853932],
          [2.348479, 48.853712],
        ],
        type: 'LineString',
      },
    },
  ] as any;
  waypoints = [
    {
      distance: 40.252,
      name: 'Rue Leperdit',
      location: [-1.681135, 48.113473],
    },
    {
      distance: 24.983,
      name: 'Parvis Notre-Dame - Place Jean-Paul II',
      location: [2.348479, 48.853712],
    },
  ];

  data = this.routes[0];
  route = this.data.geometry.coordinates;
  geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: this.route,
    },
  } as any;

  constructor() {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 12,
      center: this.center,
    });

    const bounds = [
      // [-123.069003, 45.395273],
      // [-122.303707, 45.612333],
      [-1.681135, 48.113473],
      [2.348479, 48.853712],
    ] as any;
    this.map?.setMaxBounds(bounds);

    // an arbitrary start will always be the same
    // only the end or destination will change
    const start = [-122.662323, 45.523751];

    this.map.on('load', () => {
      // this.map?.addSource('trip', {});
      this.map?.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: this.geojson,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });

      // this.map?.addLayer({
      //   id: 'point',
      //   type: 'circle',
      //   source: {
      //     type: 'geojson',
      //     data: {
      //       type: 'FeatureCollection',
      //       features: [
      //         {
      //           type: 'Feature',
      //           properties: {},
      //           geometry: {
      //             type: 'Point',
      //             coordinates: start,
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   paint: {
      //     'circle-radius': 10,
      //     'circle-color': '#3887be',
      //   },
      // });

      this.map?.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: this.routes[0].geometry,
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff7e5f',
          'line-width': 8,
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.map?.on('mouseenter', 'Rennes Points', (e: any) => {
        // if (!this.map) {
        //   console.log('map is not here');
        // }
        // this.map!.getCanvas().style.cursor = 'pointer';
        // const coordinates = e.features[0].geometry.coordinates.slice();
        // const description = e.features[0].properties.description;
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
        // popup.setLngLat(coordinates).setHTML(description).addTo(this.map!);
      });

      this.map?.on('mouseleave', 'Rennes Points', () => {
        // this.map!.getCanvas().style.cursor = '';
        // popup.remove();
      });
    });
  }
}
