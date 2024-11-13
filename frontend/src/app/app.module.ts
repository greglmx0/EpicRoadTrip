import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { AxiosInterceptorService } from '../.config/axios-interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    MatDatepickerModule,
    AppComponent,
  ],
  providers: [AxiosInterceptorService, { provide: HTTP_INTERCEPTORS, useClass: AxiosInterceptorService, multi: true }],
  bootstrap: [],
})
export class AppModule {}
