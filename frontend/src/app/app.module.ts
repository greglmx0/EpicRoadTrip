import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { MatDatepicker } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MatDatepicker, CommonModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
