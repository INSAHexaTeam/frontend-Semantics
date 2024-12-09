import { Routes } from '@angular/router';
import { SportifDetailsComponent } from './sportif-details/sportif-details.component';

export const routes: Routes = [
  { path: 'sportif/:id', component: SportifDetailsComponent },
];
