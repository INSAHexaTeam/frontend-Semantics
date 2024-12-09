import { SportifService } from './../../_services/sportif.service';
import { SharedDataService } from './../../_services/shared-data.service';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Sportif } from '../../_interfaces/sportif';
import { SportifCardComponent } from '../sportif-card/sportif-card.component';
import { Router } from '@angular/router';

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
  
  currentPage: number = 1;
  itemsPerPage: number = 36;
  totalPages: number = 0;

  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private sharedDataService: SharedDataService,
    private SportifService: SportifService,
    private router: Router
  ) {
    this.SportifService.getAllSportifs().subscribe((s: Sportif[]) => {
      this.sportifs = s;
      this.updateDisplayedSportifs();
    });
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      this.sportifs = data;
      this.updateDisplayedSportifs();
      this.has_list = true;
    });
  }

  updateDisplayedSportifs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.sportifs_display = this.sportifs.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.sportifs.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedSportifs();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedSportifs();
    }
  }

  sportifDetails(sportif: Sportif) {
    this.router.navigate(['sportif', sportif.athleteId]);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
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
    this.sportifs.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.updateDisplayedSportifs();
  }

  sortByBirthDate() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sportifs.sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      const comparison = dateA.getTime() - dateB.getTime();
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    this.updateDisplayedSportifs();
  }
}
