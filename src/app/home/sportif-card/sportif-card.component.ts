import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sportif-card',
  standalone: true,
  imports: [],
  templateUrl: './sportif-card.component.html',
  styleUrl: './sportif-card.component.css',
})
export class SportifCardComponent {
  @Input() title: string = '';
  @Input() image: string = 'assets/sportif.png';
}
