import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportifService } from '../_services/sportif.service';
import { Sportif } from '../_interfaces/sportif';

@Component({
  selector: 'app-sportif-details',
  standalone: true,
  imports: [],
  templateUrl: './sportif-details.component.html',
  styleUrl: './sportif-details.component.css',
})
export class SportifDetailsComponent {
  athleteId: string | null = '';
  sportif: Sportif | null = null;
  constructor(
    private route: ActivatedRoute,
    private sportifService: SportifService
  ) {
    this.athleteId = this.route.snapshot.paramMap.get('id');
    this.sportifService.getSportifInfo(this.athleteId!).subscribe((sportif) => {
      this.sportif = sportif;
    });
  }
}
