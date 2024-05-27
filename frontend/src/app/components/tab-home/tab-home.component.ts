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
export class TabHomeComponent implements OnInit, OnDestroy {
  searchResults: any[] = [];
  searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }
  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

  performSearch(searchValue: string) {
    throw new Error('Method not implemented.');
  }

  async search(searchInput: string) {
    console.log('Search');
    if (searchInput.length < 3) {
      return;
    }

    try {
      const response = (await ApiMapbox.getSuggestions(searchInput)) as any;
      // console.log('Response: ', response);

      if (response.status === 200) {
        this.searchResults = response.data;
        // console.log('Search results: ', this.searchResults.length);
      } else {
        console.log('Failed to search');
        console.log('Response: ', response);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
