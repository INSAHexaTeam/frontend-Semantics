import { SportifService } from './../../_services/sportif.service';
import { SportService } from './../../_services/sport.service';
import { SharedDataService } from './../../_services/shared-data.service';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Sportif } from '../../_interfaces/sportif';
import { Sport } from '../../_interfaces/sport';
import { SportifCardComponent } from '../sportif-card/sportif-card.component';
import { Router } from '@angular/router';
import { SportCardComponent } from '../sport-card/sport-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SportifCardComponent, SportCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  sportifs: Sportif[] = [];
  sports: Sport[] = [];
  has_list: boolean = false;
  sportifs_display: Sportif[] = [];
  sports_display: Sport[] = [];

  currentSportifPage: number = 1;
  currentSportPage: number = 1;
  itemsPerPage: number = 8;
  totalSportifPages: number = 0;
  totalSportPages: number = 0;

  private sportifsTotalPages: number = 0;
  private sportsTotalPages: number = 0;

  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private sharedDataService: SharedDataService,
    private SportifService: SportifService,
    private SportService: SportService,
    private router: Router
  ) {}

  ngOnInit() {
    // Chargement initial des sportifs
    this.SportifService.getAllSportifs().subscribe((s: Sportif[]) => {
      this.sportifs = s;
      this.sportifsTotalPages = Math.ceil(
        this.sportifs.length / this.itemsPerPage
      );
      this.has_list = true;
    });

    // Chargement initial des sports
    this.SportService.getAllOlympicSports().subscribe((s: Sport[]) => {
      this.sports = s;
      this.sportsTotalPages = Math.ceil(this.sports.length / this.itemsPerPage);

      this.updateSportDisplayedItems();
      this.updateSportifDisplayedItems();
      this.has_list = true;
    });

    // Souscription aux changements de données
    this.sharedDataService.data$.subscribe((data) => {
      this.sportifs = data;
      console.log(this.sportifs.length);

      this.sportifsTotalPages = Math.ceil(
        this.sportifs.length / this.itemsPerPage
      );
      this.updateSportifDisplayedItems();
    });
  }

  private updateSportifDisplayedItems() {
    const startIndex = (this.currentSportifPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.sportifs_display = this.sportifs.slice(startIndex, endIndex);
    this.totalSportifPages = this.sportifsTotalPages;
  }
  private updateSportDisplayedItems() {
    const startIndex = (this.currentSportPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.sports_display = this.sports.slice(startIndex, endIndex);
    this.totalSportPages = this.sportsTotalPages;
  }

  nextPageSportif() {
    if (this.currentSportifPage < this.totalSportifPages) {
      this.currentSportifPage++;
      this.updateSportifDisplayedItems();
    }
  }

  nextPageSport() {
    if (this.currentSportPage < this.totalSportPages) {
      this.currentSportPage++;
      this.updateSportDisplayedItems();
    }
  }
  previousSportPage() {
    if (this.currentSportPage > 1) {
      this.currentSportPage--;
      this.updateSportDisplayedItems();
    }
  }

  previousSportifPage() {
    if (this.currentSportifPage > 1) {
      this.currentSportifPage--;
      this.updateSportifDisplayedItems();
    }
  }

  sportifDetails(sportif: Sportif) {
    console.log(sportif);

    this.router.navigate(['sportif', sportif.athleteId]);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.nextPageSportif();
        this.nextPageSport();
        break;
      case 'ArrowLeft':
        this.previousSportifPage();
        this.previousSportPage();
        break;
    }
  }

  sortByName() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sportifs.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.sports.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.updateSportifDisplayedItems();
    this.updateSportDisplayedItems();
  }

  sortByBirthDate() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sportifs.sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      const comparison = dateA.getTime() - dateB.getTime();
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.updateSportifDisplayedItems();
  }
}
