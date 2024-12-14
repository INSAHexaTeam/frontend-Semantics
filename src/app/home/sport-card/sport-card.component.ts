import { Component, Input } from '@angular/core';
import { Sport } from '../../_interfaces/sport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-card',
  standalone: true,
  imports: [],
  templateUrl: './sport-card.component.html',
  styleUrl: './sport-card.component.css',
})
export class SportCardComponent {
  @Input() sport!: Sport;
  constructor() { }

  handleImageError(event: any) {
    event.target.src = 'assets/sports.png'; 
  }
}
