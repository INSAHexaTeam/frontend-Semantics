import { FormControl, FormsModule } from '@angular/forms';
import { Sportif } from '../../_interfaces/sportif';
import { SportifService } from '../../_services/sportif.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../_services/shared-data.service';
import { ErrorComponent } from '../../popup/error/error.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ErrorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  sportifs: Sportif[] = [];
  suggestion: Sportif[] = [];
  searchResult: Sportif[] = [];
  @ViewChild(ErrorComponent) errorPopup!: ErrorComponent;
  query: string = '';

  constructor(
    private sportifService: SportifService,
    private router: Router,
    private sharedService: SharedDataService
  ) {}
  ngOnInit(): void {
    this.sharedService.input$.subscribe((sportifs) => {
      this.sportifs = sportifs;
    });
  }

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
    this.sportifService.getSportifByName(this.query).subscribe(
      (sportifs: Sportif[]) => {
        this.router.navigate(['home']);
        this.sharedService.setData(sportifs);
      },
      (error) => {
        this.errorPopup.display = true;
        console.log(error);

        this.errorPopup.texte = error.error.message;
        setTimeout(() => {
          this.errorPopup.display = false;
          this.router.navigate(['/home']);
        }, 3000);
      }
    );
  }

  scrollToTop() {
    this.router.navigate(['/']);
  }
}
