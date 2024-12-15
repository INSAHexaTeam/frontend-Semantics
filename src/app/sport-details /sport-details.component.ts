import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../_interfaces/sport';
import { Sportif } from '../_interfaces/sportif';
import { SportifService } from '../_services/sportif.service';
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
  athletes: Sportif[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private sportifService: SportifService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.sport = navigation.extras.state['sport'];
      this.loadAthletes();
    } else {
      this.router.navigate(['/home']);
    }
  }

  private loadAthletes() {
    this.sportifService.getAllSportifs().subscribe({
      next: (athletes) => {
        // Filtrer les athlètes qui pratiquent ce sport
        this.athletes = athletes.filter(athlete =>
          athlete.listSports.includes(this.sport.name)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading athletes:', error);
        this.isLoading = false;
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = 'assets/sports.png';
  }

  onAthleteClick(athleteId: string) {
    this.router.navigate(['/sportif', athleteId]);
  }
}
