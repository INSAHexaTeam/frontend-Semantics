import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  standalone: true,
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
})
export class LoadingScreenComponent {
  @Input() display: boolean = false;
}
