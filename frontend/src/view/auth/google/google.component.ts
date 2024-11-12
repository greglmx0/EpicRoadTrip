import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import auth from '../../../api/auth';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google.component.html',
  styleUrl: './google.component.scss',
})
export class GoogleComponent implements OnInit {
  code: string | null = null;
  constructor() {}

  async ngOnInit() {
    // get qury params from url "code"
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');

    // call loginWithGoogleCallback
    try {
      if (!this.code) {
        throw new Error('Code not found');
      }
      const requestSendCode = await auth.loginWithGoogleCallback(this.code);
      const token = requestSendCode?.data?.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      console.error('Error: ', error);
      window.location.href = '/login';
    }
  }
}
