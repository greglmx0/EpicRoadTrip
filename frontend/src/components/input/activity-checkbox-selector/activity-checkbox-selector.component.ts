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
      label: 'Evenements',
    },
    {
      id: 2,
      value: 'sleep',
      label: 'Dormir',
    },
    // {
    //   id: 3,
    //   value: 'travel',
    //   label: 'Travel',
    // },
    {
      id: 4,
      value: 'eat',
      label: 'Manger',
    },
    {
      id: 5,
      value: 'drink',
      label: 'Boire',
    },
  ];

  selectType(event: string = this.selectedType) {
    this.sendType.emit(event);
  }
}
