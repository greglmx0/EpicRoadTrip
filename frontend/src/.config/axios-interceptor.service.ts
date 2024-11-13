import axiosInstance from './axios';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AxiosInterceptorService {
  constructor(private router: Router) {
    console.log('AxiosInterceptorService initialized');

    this.initializeInterceptor();
  }

  private initializeInterceptor() {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // this.router.navigate(['/login']);
          localStorage.removeItem('token');
        }
        return Promise.reject(error);
      },
    );
  }
}
