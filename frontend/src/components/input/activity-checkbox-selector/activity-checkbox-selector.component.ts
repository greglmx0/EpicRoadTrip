import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
type ActivityType = 'enjoy' | 'sleep' | 'travel' | 'eat' | 'drink';

@Component({
  selector: 'app-activity-checkbox-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-checkbox-selector.component.html',
  styleUrl: './activity-checkbox-selector.component.scss',
})
export class ActivityCheckboxSelectorComponent {
  @Output() sendType = new EventEmitter();
  typePointOfInterest: any[] = [
    {
      name: 'enjoy',
    },
    {
      name: 'sleep',
    },
    {
      name: 'travel',
    },
    {
      name: 'eat',
    },
    {
      name: 'drink',
    },
  ];
  selectedType: string = 'enjoy';

  ngOnInit() {
    this.sendType.emit(this.selectedType);
  }

  selectType(type: any) {
    this.selectedType = type;
    this.sendType.emit(type);
  }
}
