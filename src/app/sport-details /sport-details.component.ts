import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../_interfaces/sport';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../popup/error/error.component';
import { LoadingScreenComponent } from '../popup/loading-screen/loading-screen.component';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [CommonModule, ErrorComponent, LoadingScreenComponent],
  templateUrl: './sport-details.component.html',
  styleUrl: './sport-details.component.css',
})
export class SportDetailsComponent {
  sport!: Sport;
  isLoading: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.sport = navigation.extras.state['sport'];
    } else {
      this.router.navigate(['/home']);
    }
  }

  handleImageError(event: any) {
    event.target.src = 'assets/sports.png';
  }
}
