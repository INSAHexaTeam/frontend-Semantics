import { SportifService } from './../../_services/sportif.service';
import { SharedDataService } from './../../_services/shared-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Sportif } from '../../_interfaces/sportif';
import { SportifCardComponent } from '../sportif-card/sportif-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SportifCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  sportifs: Sportif[] = [];
  has_list: boolean = false;
  sportifs_display: Sportif[] = [];
  constructor(
    private sharedDataService: SharedDataService,
    private SportifService: SportifService
  ) {
    this.SportifService.getAllSportifs().subscribe((s: Sportif[]) => {
      this.sportifs = s;
    });
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      this.sportifs = data;
      this.sportifs_display = data;
      this.has_list = true;
    });
  }
}
