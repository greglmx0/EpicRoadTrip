import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPlacesOfInterestComponent } from 'src/components/search-places-of-interest/search-places-of-interest.component';

@Component({
  selector: 'app-points-of-interest',
  templateUrl: './points-of-interest.component.html',
  styleUrls: ['./points-of-interest.component.css'],
  imports: [CommonModule, FormsModule, SearchPlacesOfInterestComponent],
  standalone: true,
})
export class PointsOfInterestComponent {}
