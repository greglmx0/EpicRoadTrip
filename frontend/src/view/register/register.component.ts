import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import auth from '../../api/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  failure: any;
  constructor(private router: Router) {}

  async register(username: string, password: string, email: string) {
    console.log('Register');
    console.log('Username: ' + username);
    console.log('Password: ' + password);
    console.log('Email: ' + email);

    try {
      const response = (await auth.register(username, email, password)) as any;
      // console.log('Response: ', response);

      if (response.status === 201) {
        console.log('Registered successfully');
        this.router.navigate(['/login']);
      } else {
        console.log('Failed to register');
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async loginWithGoogle() {
    console.log('Login with Google');
    try {
      const response = (await auth.loginWithGoogle()) as any;
      console.log('Response: ', response);

      if (response.status === 200) {
        console.log('Logged in successfully');
        this.router.navigate(['/']);
      } else {
        console.log('Failed to login');
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
