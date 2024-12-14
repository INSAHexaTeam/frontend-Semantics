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
  is_sportifs_page: boolean = true;
  sportifs_display: Sportif[] = [];
  sports_display: Sport[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 36;
  totalPages: number = 0;

  private sportifsTotalPages: number = 0;
  private sportsTotalPages: number = 0;

  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private sharedDataService: SharedDataService,
    private SportifService: SportifService,
    private SportService: SportService,
    private router: Router
  ) { }

  ngOnInit() {
    // Chargement initial des sportifs
    this.SportifService.getAllSportifs().subscribe((s: Sportif[]) => {
      this.sportifs = s;
      this.sportifsTotalPages = Math.ceil(this.sportifs.length / this.itemsPerPage);
      this.updateDisplayedItems();
      this.has_list = true;
    });

    // Chargement initial des sports
    this.SportService.getAllOlympicSports().subscribe((s: Sport[]) => {
      this.sports = s;
      this.sportsTotalPages = Math.ceil(this.sports.length / this.itemsPerPage);
      this.updateDisplayedItems();
      this.has_list = true;
    });

    // Souscription aux changements de données
    this.sharedDataService.data$.subscribe((data) => {
      if (data.sportifs) {
        this.sportifs = data.sportifs;
        this.sportifsTotalPages = Math.ceil(this.sportifs.length / this.itemsPerPage);
        this.updateDisplayedItems();
      }
      if (data.sports) {
        this.sports = data.sports; 
        this.sportsTotalPages = Math.ceil(this.sports.length / this.itemsPerPage);
        this.updateDisplayedItems();
      }
    });
  }

  private updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if (this.is_sportifs_page) {
      this.sportifs_display = this.sportifs.slice(startIndex, endIndex);
      this.totalPages = this.sportifsTotalPages;
    } else {
      this.sports_display = this.sports.slice(startIndex, endIndex);
      this.totalPages = this.sportsTotalPages;
    }
  }

  changeDisplay() {
    this.is_sportifs_page = !this.is_sportifs_page;
    this.currentPage = 1;
    this.updateDisplayedItems();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
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
        this.nextPage();
        break;
      case 'ArrowLeft':
        this.previousPage();
        break;
    }
  }

  sortByName() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if (this.is_sportifs_page) {
      this.sportifs.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    } else {
      this.sports.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    this.updateDisplayedItems(); // Utilisez la méthode unifiée
  }

  sortByBirthDate() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sportifs.sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      const comparison = dateA.getTime() - dateB.getTime();
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.updateDisplayedItems(); // Utilisez la méthode unifiée
  }
}
