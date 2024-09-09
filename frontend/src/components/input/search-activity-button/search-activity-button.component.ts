import { Component, Input } from '@angular/core';
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
  selectedLocationText: string = '';
  @Input() selectedType: ActivityType | null = null;
  @Input() selectedDateRange: { start: Date; end: Date } | null = null;
  @Input() selectedLocationLatLng: { lat: number; lng: number } = { lat: 0, lng: 0 };

  range: any;
  sendLocation: any;
  // cdr: any;
  sendMapCenter: any;

  // retrieve = recuperer (la location subgerer)
  async searchRetrieve() {
    console.log('searchRetrieve');

    try {
      this.loading = true;

      if (!this.selectedLocation) {
        this.failure = 'Rentrer une adresse valide';
        return;
      }

      if (!this.selectedType) {
        this.failure = "Choisir un type d'activité";
        return;
      }

      this.failure = '';

      const response = (await ApiMapbox.getRetrieve(this.selectedLocation.mapbox_id)) as any;

      if (response.status === 200) {
        this.selectedLocation = response.data;

        const start = this.range.start.toISOString().split('T')[0].replace(/,/g, '');
        const end = this.range.end.toISOString().split('T')[0].replace(/,/g, '');

        // Créer un mapping entre le type d'activité et les fonctions API correspondantes
        const apiMapping = {
          enjoy: ApiEnjoy.getEnjoy,
          sleep: ApiSleep.getSleep,
          travel: ApiTravel.getTravel,
          eat: ApiEat.getEat,
          drink: ApiDrink.getDrink,
        };

        const retrieve = await this.getRetrieve(apiMapping[this.selectedType], start, end);

        if (retrieve && retrieve.length > 0) {
          this.selectedLocationText = `${this.selectedLocation[0].properties.full_address} du ${start} au ${end}`;
          this.sendLocation.emit(retrieve);
        } else {
          this.selectedLocationText = '';
          this.failure = 'Aucun résultat trouvé';
        }
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
    this.sendMapCenter.emit({
      lat: this.selectedLocation[0].geometry.coordinates[1],
      lng: this.selectedLocation[0].geometry.coordinates[0],
    });

    const result = await apiFunc(
      this.selectedLocation[0].geometry.coordinates[1],
      this.selectedLocation[0].geometry.coordinates[0],
      start,
      end,
    );

    return result;
  }
}
