import { Component, Input, OnInit } from '@angular/core';
import type EnjoyDto from 'src/api/dto/enjoy.dto';

@Component({
  selector: 'app-card-point-interrest',
  standalone: true,
  imports: [],
  templateUrl: './card-point-interrest.component.html',
  styleUrl: './card-point-interrest.component.scss',
})
export class CardPointInterrestComponent implements OnInit {
  @Input() point!: EnjoyDto;

  constructor() {}

  ngOnInit() {
    console.log(this.point);
  }
}
