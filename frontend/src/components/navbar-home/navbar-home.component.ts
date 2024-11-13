import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import auth from './../../api/auth';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NavbarHomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Appel à l'API pour récupérer les informations de l'utilisateur
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    const request = await auth.getUserInfo();
    if (request.status === 200) {
      this.isAuthenticated = true;
      this.username = request.data.username;
    } else {
      this.isAuthenticated = false;
      this.username = null;
    }
  }

  async logout(): Promise<void> {
    const request = await auth.logout();
    if (request.status === 200) {
      this.isAuthenticated = false;
      this.username = null;
      this.router.navigate(['/login']);
    }
  }
}
