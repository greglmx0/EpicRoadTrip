import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../view/login/login.component';
import { RegisterComponent } from '../view/register/register.component';
import { HomeComponent } from '../view/home/home.component';
import { GoogleComponent } from '../view/auth/google/google.component';
import { StyleComponent } from 'src/view/style/style.component';
import { TripComponent } from 'src/view/trip/trip.component';
import { PointsOfInterestComponent } from 'src/view/points-of-interest/points-of-interest.component';
import { NavbarHomeComponent } from 'src/components/navbar-home/navbar-home.component';
import { UserTripsComponent } from 'src/view/user-trips/user-trips.component';
import { TripOverviewComponent } from 'src/view/trip-overview/trip-overview.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'style', component: StyleComponent },
  { path: 'auth/google', component: GoogleComponent },

  {
    path: '',
    component: NavbarHomeComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'trip', component: TripComponent },
      { path: 'points-of-interest', component: PointsOfInterestComponent },
      { path: 'user-trips', component: UserTripsComponent },
      { path: 'trip/:id', component: TripOverviewComponent },
    ],
  },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
  // redirect to home page on 404
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
