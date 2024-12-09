import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  standalone: true,
})
export class ErrorComponent {
  @Input() display: boolean = false;
  @Input() title: string = 'une erreur est survenue';
  @Input() texte: string = '';
}
