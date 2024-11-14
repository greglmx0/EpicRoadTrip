import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../view/login/login.component';
import { RegisterComponent } from '../view/register/register.component';
import { HomeComponent } from '../view/home/home.component';
import { GoogleComponent } from '../view/auth/google/google.component';
import { StyleComponent } from 'src/view/style/style.component';
import { NavbarHomeComponent } from 'src/components/navbar-home/navbar-home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'style', component: StyleComponent },
  { path: 'auth/google', component: GoogleComponent },

  {
    path: 'test',
    component: NavbarHomeComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
  // redirect to home page on 404
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
