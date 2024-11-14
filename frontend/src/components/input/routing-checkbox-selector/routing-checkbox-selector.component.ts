import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routing-checkbox-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routing-checkbox-selector.component.html',
  styleUrl: './routing-checkbox-selector.component.scss',
})
export class RoutingCheckboxSelectorComponent {
  @Input({ required: true })
  radioName!: string;
  @Output() sendType = new EventEmitter<string>();

  selectedType: string = 'driving';
  typePointOfInterest: any[] = [
    {
      id: 1,
      value: 'driving',
      label: 'Driving',
    },
    {
      id: 2,
      value: 'walking',
      label: 'Walking',
    },
    {
      id: 3,
      value: 'cycling',
      label: 'Cycling',
    },
  ];

  selectType() {
    this.sendType.emit(this.selectedType);
  }
}
