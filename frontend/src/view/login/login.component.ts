import { Component } from '@angular/core';
import auth from '../../api/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  failure: any;
  constructor() {}

  async login(email: string, password: string) {
    console.log('Login');
    console.log('Email: ' + email);
    console.log('Password: ' + password);

    try {
      const response = (await auth.login(email, password)) as any;
      // console.log('Response: ', response);

      if (response.status === 200) {
        console.log('Logged in successfully');
        window.location.href = '/';
      } else {
        console.log('Failed to login');
        console.log('Response: ', response);

        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
