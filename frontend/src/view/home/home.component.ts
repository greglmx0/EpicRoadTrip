import { Component, Input } from '@angular/core';
import { NavbarHomeComponent } from 'src/app/components/navbar-home/navbar-home.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { TabHomeComponent } from 'src/app/components/tab-home/tab-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarHomeComponent, MapComponent, TabHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  points: any = [];
  constructor() {}

  coordinatesGeocoder = function (query: any) {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    if (!matches) {
      return null;
    }

    function coordinateFeature(lng: any, lat: any) {
      return {
        center: [lng, lat],
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature',
      };
    }

    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes = [];

    if (coord1 < -90 || coord1 > 90) {
      // must be lng, lat
      geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
      // must be lat, lng
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
      // else could be either lng, lat or lat, lng
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
  };

  onSendLocation(location: any) {
    console.log('Location in home: ', location);
    // this.points.push({
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [location.lng, location.lat],
    //   },
    //   properties: {
    //     title: location.title,
    //     description: location.description,
    //   },
    // });
    this.points = [
      {
        lat: 48.113248,
        lng: -1.681558,
        name: 'Rennes',
      },
    ];
  }
}
