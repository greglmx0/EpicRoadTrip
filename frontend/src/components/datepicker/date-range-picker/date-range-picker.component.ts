import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

/** @title Date range picker forms integration */
@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
})
export class AppDateRangePicker {
  @Output() dateRange = new EventEmitter<{ start: Date; end: Date }>();
  range = new FormGroup({
    start: new FormControl<Date>(new Date()),
    end: new FormControl<Date>(new Date()),
  });

  // if range is changed, emit the new range
  validateRange() {
    const start = this.range.value.start || new Date();
    const end = this.range.value.end || new Date();

    this.dateRange.emit({
      start,
      end,
    });
  }
}
