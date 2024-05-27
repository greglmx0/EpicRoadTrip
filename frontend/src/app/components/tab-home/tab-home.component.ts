import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApiMapbox from '../../../api/mapbox';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tab-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-home.component.html',
  styleUrl: './tab-home.component.scss',
})
export class TabHomeComponent implements OnInit {
  searchResults: any[] = [];
  subject: Subject<any> = new Subject();
  selectedLocation: any = null;
  private readonly debounceTimeMs = 700; // Set the debounce time (in milliseconds)

  constructor() {
    this.searchResults = new Array();
  }

  ngOnInit() {
    this.subject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  async performSearch(searchValue: string) {
    if (searchValue.length < 3) {
      this.searchResults = [];
      return;
    }

    try {
      const response = (await ApiMapbox.getSuggestions(searchValue)) as any;

      if (response.status === 200) {
        this.searchResults = response.data;
      } else {
        console.log('Failed to search');
        console.log('Response: ', response);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async search(searchInput: string) {
    this.subject.next(searchInput);
  }

  async selectLocation(location: any) {
    console.log('Selected location: ', location);

    this.selectedLocation = location;
  }

  async serachLocation() {
    console.log('Search location: ', this.selectedLocation);

    if (!this.selectedLocation) {
      return;
    }

    console.log('Selected Location: ', this.selectedLocation);
    console.log('Location id: ', this.selectedLocation.mapbox_id);
  }
}
