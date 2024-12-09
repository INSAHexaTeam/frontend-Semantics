import { FormControl, FormsModule } from '@angular/forms';
import { Sportif } from '../../_interfaces/sportif';
import { SportifService } from '../../_services/sportif.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() sportifs: Sportif[] = [];

  suggestion: Sportif[] = [];
  searchResult: Sportif[] = [];
  query: string = '';

  @Output() listsUpdated = new EventEmitter<{
    searchResult: Sportif[];
  }>();

  constructor(private sportifService: SportifService, private router: Router) {}

  onSearchInput() {
    if (this.query.trim() === '') {
      this.suggestion = [];
      return;
    }

    this.suggestion = this.sportifs.filter((sportif) =>
      sportif.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  selectSuggestion(sugg: Sportif) {
    this.query = sugg.name;
    this.suggestion = [];
  }
  searchSportif() {
    this.sportifService
      .getSportifByName(this.query)
      .subscribe((sportifs: Sportif[]) => {
        this.listsUpdated.emit({ searchResult: sportifs });
      });
  }
}
