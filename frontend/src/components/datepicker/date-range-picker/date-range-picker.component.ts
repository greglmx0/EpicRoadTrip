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
  @Output() dateRange = new EventEmitter<{ start: Date | null | undefined; end: Date | null | undefined }>();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // if range is changed, emit the new range
  validateRange() {
    this.dateRange.emit({
      start: this.range.value.start,
      end: this.range.value.end,
    });
  }
}
