import { Component, EventEmitter, Input, Output } from '@angular/core';
import ApiMapbox from 'src/api/mapbox';
import ApiEnjoy from 'src/api/apiEnjoy';
import ApiEat from 'src/api/apiEat';
import ApiDrink from 'src/api/apiDrink';
import ApiSleep from 'src/api/apiSleep';
import ApiTravel from 'src/api/apiTravel';

type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';

@Component({
  selector: 'app-search-activity-button',
  standalone: true,
  imports: [],
  templateUrl: './search-activity-button.component.html',
  styleUrl: './search-activity-button.component.scss',
})
export class SearchActivityButtonComponent {
  loading: boolean = false;
  failure: string = '';
  selectedLocation: any = null;
  // selectedLocationText: string = '';
  @Output() sendLocation = new EventEmitter();
  @Input() selectedType: ActivityType | null = null;
  @Input() selectedDateRange: { start: Date; end: Date } | null = null;
  @Input() selectedLocationLatLng: { lat: number; lng: number } | null = null;

  apiMapping = {
    enjoy: ApiEnjoy.getEnjoy,
    sleep: ApiSleep.getSleep,
    travel: ApiTravel.getTravel,
    eat: ApiEat.getEat,
    drink: ApiDrink.getDrink,
  };

  // retrieve = recuperer (la location subgerer)
  async searchRetrieve() {
    console.log('searchRetrieve');

    this.loading = true;

    if (!this.selectedLocationLatLng) {
      this.failure = 'Rentrer une adresse valide';
      return;
    }

    if (!this.selectedType) {
      this.failure = "Choisir un type d'activité";
      return;
    }

    const start = this.selectedDateRange?.start.toISOString().split('T')[0].replace(/,/g, '');
    const end = this.selectedDateRange?.end.toISOString().split('T')[0].replace(/,/g, '');

    if (!start || !end) {
      this.failure = 'Rentrer une date valide';
      return;
    }
    this.failure = '';
    try {
      const retrieve = await this.getRetrieve(this.apiMapping[this.selectedType], start, end);

      if (retrieve && retrieve.length > 0) {
        // this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;
        this.sendLocation.emit(retrieve);
      } else {
        // this.selectedLocationText = '';
        this.failure = 'Aucun résultat trouvé';
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
      // this.cdr.detectChanges();
    }
  }

  // Fonction générique pour récupérer les données
  async getRetrieve(apiFunc: Function, start: string, end: string): Promise<any[]> {
    if (this.selectedLocationLatLng?.lat || this.selectedLocationLatLng?.lng) {
      // this.sendMapCenter.emit({
      //   lat: this.selectedLocationLatLng.lat,
      //   lng: this.selectedLocationLatLng.lng,
      // });
      const result = await apiFunc(this.selectedLocationLatLng.lat, this.selectedLocationLatLng.lng, start, end);
      return result;
    }
    return [];
  }
}
