import { Component, Input, OnInit } from '@angular/core';
import type EnjoyDto from 'src/api/dto/enjoy.dto';
import { CommonModule } from '@angular/common';
import { formatDate, formatTime } from 'src/utils/utils';

@Component({
  selector: 'app-card-point-interrest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-point-interrest.component.html',
  styleUrl: './card-point-interrest.component.scss',
})
export class CardPointInterrestComponent {
  @Input() event!: EnjoyDto;
  showMore: boolean = false;

  get date() {
    return formatDate(this.event.dateTime);
  }

  get time() {
    return formatTime(this.event.dateTime);
  }

  get description() {
    if (this.showMore) {
      return this.event.description;
    } else {
      return this.event.description?.slice(0, 200);
    }
  }
}
