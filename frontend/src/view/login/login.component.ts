import { Component } from '@angular/core';
import auth from '../../api/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  failure: any;
  loading: boolean = false;

  constructor() {}

  async login(email: string, password: string) {
    try {
      this.loading = true;
      const response = (await auth.login(email, password)) as any;
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.loading = true;
      const response = (await auth.loginWithGoogle()) as any;
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      this.loading = false;
    }
  }
}
