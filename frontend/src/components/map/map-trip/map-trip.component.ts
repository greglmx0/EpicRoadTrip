import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ApplicationRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  // @Input() points: Array<{ name: string; coordinates: number[]; description?: string }> = [];
  style = 'mapbox://styles/mapbox/streets-v12';

  @Input() routes: any;
  @Input() waypoints: any;

  @Output() centerChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 12,
      center: this.waypoints[1]?.location,
    });

    this.map.on('load', () => {
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

      // calculate the radius of the map for at the beginning
      const ret = this.gatCenterAndRadius();
      this.centerChange.emit(ret);

      // calculate the radius of the map when the map is moved
      this.map?.on('move', () => {
        const ret = this.gatCenterAndRadius();
        this.centerChange.emit(ret);
      });
    });
  }

  gatCenterAndRadius() {
    const center = this.map?.getCenter();
    const bounds = this.map?.getBounds();
    const boundsEst = bounds?.getEast();
    const boundsWest = bounds?.getWest();
    // dsitance between boundsEst and boundsWest in km
    if (!boundsEst || !boundsWest || !center) return;
    const distance = this.getDistanceFromLatLonInKm(boundsWest, 10, boundsEst, 10);
    const radius = distance / 2;

    return { center, radius };
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
