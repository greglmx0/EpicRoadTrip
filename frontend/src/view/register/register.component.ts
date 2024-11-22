import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import auth from '../../api/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  failure: any;
  constructor(private router: Router) {}

  async register(username: string, password: string, email: string) {
    try {
      const response = (await auth.register(username, email, password)) as any;

      if (response.status === 201) {
        this.router.navigate(['/']);
      } else {
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async loginWithGoogle() {
    try {
      const response = (await auth.loginWithGoogle()) as any;
      if (response.status === 200) {
        this.router.navigate(['/']);
      } else {
        this.failure = response?.data?.message;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
