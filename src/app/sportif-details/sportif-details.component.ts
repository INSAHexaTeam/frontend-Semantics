import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportifService } from '../_services/sportif.service';
import { SportifFullDescription } from '../_interfaces/sportif';
import { ErrorComponent } from '../popup/error/error.component';
import { catchError, of, throwError } from 'rxjs';
import { Sport } from '../_interfaces/sport';
import { SportService } from '../_services/sport.service';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../popup/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sportif-details',
  standalone: true,
  imports: [ErrorComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './sportif-details.component.html',
  styleUrl: './sportif-details.component.css',
})
export class SportifDetailsComponent {
  isLoading: boolean = true;

  athleteId: string | null = '';
  sportif: SportifFullDescription | null = null;
  entries: any[] = [];
  sports: Sport[] = [];


  @ViewChild(ErrorComponent) errorPopup!: ErrorComponent;
  constructor(
    private route: ActivatedRoute,
    private sportifService: SportifService,
    private router: Router,
    private sportService: SportService
  ) {
    this.athleteId = this.route.snapshot.paramMap.get('id');
    forkJoin({
      sportif: this.sportifService.getSportifInfo(this.athleteId!),
      sports: this.sportService.getAllOlympicSports()
    }).subscribe({
      next: (data) => {
        this.sportif = data.sportif;
        this.sports = data.sports;
        let sportifInfo = this.filterNonEmptyFields(data.sportif);
        this.entries = Object.entries(sportifInfo);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorPopup.display = true;
        this.errorPopup.texte = error.error.error;
        setTimeout(() => {
          this.errorPopup.display = false;
          this.router.navigate(['/home']);
        }, 3000);
      }
    });
  }


  filterNonEmptyFields(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        return (
          value !== null &&
          value !== undefined &&
          value !== '' &&
          (!Array.isArray(value) ||
            (value.length > 0 && value.some((v) => v !== ''))) &&
          (typeof value !== 'object' || Object.keys(value).length > 0)
        );
      })
    );
  }

  handleImageError(event: any) {
    event.target.src = 'assets/user.png';
  }

  findSportWithName(sportName: string): Sport | undefined {
    return this.sports.find(sport => sport.name === sportName);
  }

  onSportClick(sportName: string) {
    const sport = this.findSportWithName(sportName);
    if (sport) {
      this.router.navigate(['/sport', sport.name], { state: { sport: sport } });
    }
  }

  hasMedals(): boolean {
    return !!(
      this.sportif?.nbGoldMedals ||
      this.sportif?.nbSilverMedals ||
      this.sportif?.nbBronzeMedals
    );
  }
}
