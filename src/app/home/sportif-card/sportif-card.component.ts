import { Component, Input } from '@angular/core';
import { Sportif } from '../../_interfaces/sportif';
import { Router } from '@angular/router';

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
}
