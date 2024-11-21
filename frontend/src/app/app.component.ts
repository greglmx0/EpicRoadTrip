import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AxiosInterceptorService } from '../.config/axios-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //  constructor(private axiosInterceptorService: AxiosInterceptorService) {}
  constructor() {}
  title = 'frontend';
}
