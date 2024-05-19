import { Component } from '@angular/core';
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
export class HomeComponent {}
