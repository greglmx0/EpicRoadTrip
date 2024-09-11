import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-checkbox-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-checkbox-selector.component.html',
  styleUrl: './activity-checkbox-selector.component.scss',
})
export class ActivityCheckboxSelectorComponent {
  @Input({ required: true })
  radioName!: string;
  @Output() sendType = new EventEmitter<string>();

  selectedType: string = 'enjoy';
  typePointOfInterest: any[] = [
    {
      id: 1,
      value: 'enjoy',
      label: 'Enjoy',
    },
    {
      id: 2,
      value: 'sleep',
      label: 'Sleep',
    },
    {
      id: 3,
      value: 'travel',
      label: 'Travel',
    },
    {
      id: 4,
      value: 'eat',
      label: 'Eat',
    },
    {
      id: 5,
      value: 'drink',
      label: 'Drink',
    },
  ];

  selectType() {
    this.sendType.emit(this.selectedType);
  }
}
