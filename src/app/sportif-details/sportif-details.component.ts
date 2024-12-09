import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportifService } from '../_services/sportif.service';
import { SportifFullDescription } from '../_interfaces/sportif';
import { ErrorComponent } from '../popup/error/error.component';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-sportif-details',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './sportif-details.component.html',
  styleUrl: './sportif-details.component.css',
})
export class SportifDetailsComponent {
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
        this.entries = Object.entries(data);
      },
      (error) => {
        this.errorPopup.display = true;
        this.errorPopup.texte = error.error.error;
        setTimeout(() => {
          this.errorPopup.display = false;
          this.router.navigate(['/home']);
        }, 3000);
      }
    );
  }
}
