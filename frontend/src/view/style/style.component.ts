import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-style',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './style.component.html',
})
export class StyleComponent {
  constructor() {}
}
