import { Routes } from '@angular/router';
import { SportifDetailsComponent } from './sportif-details/sportif-details.component';
import { AppComponent } from './home/app.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
  { path: 'sportif/:id', component: SportifDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];
