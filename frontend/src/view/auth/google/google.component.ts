import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const code = params['code'];
      if (!code) {
        this.router.navigate(['/login']);
        return;
      }

      try {
        const requestSendCode = await auth.loginWithGoogleCallback(code);
        if (requestSendCode.status === 200) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Error: ', error);
        this.router.navigate(['/login']);
      }
    });
  }
}
