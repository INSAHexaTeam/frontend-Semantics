import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportifService } from '../_services/sportif.service';
import { SportifFullDescription } from '../_interfaces/sportif';
import { ErrorComponent } from '../popup/error/error.component';
import { catchError, of, throwError } from 'rxjs';
import { LoadingScreenComponent } from '../popup/loading-screen/loading-screen.component';

@Component({
  selector: 'app-sportif-details',
  standalone: true,
  imports: [ErrorComponent, LoadingScreenComponent],
  templateUrl: './sportif-details.component.html',
  styleUrl: './sportif-details.component.css',
})
export class SportifDetailsComponent {
  isLoading: boolean = true;

  athleteId: string | null = '';
  sportif: SportifFullDescription | null = null;
  entries: any[] = [];
  @ViewChild(ErrorComponent) errorPopup!: ErrorComponent;
  constructor(
    private route: ActivatedRoute,
    private sportifService: SportifService,
    private router: Router
  ) {
    this.athleteId = this.route.snapshot.paramMap.get('id');
    this.sportifService.getSportifInfo(this.athleteId!).subscribe(
      (data) => {
        this.sportif = data;

        let sportifInfo = this.filterNonEmptyFields(data);

        this.entries = Object.entries(sportifInfo);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorPopup.display = true;
        this.errorPopup.texte = error.error.error;
        setTimeout(() => {
          this.errorPopup.display = false;
          this.router.navigate(['/home']);
        }, 3000);
      }
    );
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
}
