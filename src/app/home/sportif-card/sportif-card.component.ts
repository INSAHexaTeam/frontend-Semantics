import { Component, Input } from '@angular/core';
import { Sportif } from '../../_interfaces/sportif';
import { Router } from '@angular/router';
import { LoadingScreenComponent } from '../../popup/loading-screen/loading-screen.component';

@Component({
  selector: 'app-sportif-card',
  standalone: true,
  imports: [],
  templateUrl: './sportif-card.component.html',
  styleUrl: './sportif-card.component.css',
})
export class SportifCardComponent {
  @Input() sportif!: Sportif;

  constructor() {}
  handleImageError(event: any) {
    event.target.src = 'assets/user.png';
  }
}
