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
import { Sport } from '../../_interfaces/sport';
import { LoadingScreenComponent } from '../../popup/loading-screen/loading-screen.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ErrorComponent, LoadingScreenComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = false;
  sportifs: Sportif[] = [];
  suggestion: string[] = [];
  searchResult: Sportif[] = [];
  @ViewChild(ErrorComponent) errorPopup!: ErrorComponent;
  query: string = '';

  constructor(
    private sportifService: SportifService,
    private router: Router,
    private sharedService: SharedDataService
  ) {}
  ngOnInit(): void {
    this.sportifService.getAllSportifs().subscribe((data: Sportif[]) => {
      this.sportifs = data;
    });
  }

  onSearchInput(): void {
    if (!this.query.trim()) {
      this.suggestion = [];
      return;
    }

    this.suggestion = this.sportifs
      .filter((sportif) =>
        sportif.name.toLowerCase().includes(this.query.trim().toLowerCase())
      )
      .map((sportif) => sportif.name)
      .filter((name, index, self) => self.indexOf(name) === index);
  }
  selectSuggestion(sugg: string) {
    this.query = sugg;
    this.suggestion = [];
  }
  searchSportif() {
    this.isLoading = true;
    this.sportifService.getSportifByName(this.query).subscribe(
      (sportifs: Sportif[]) => {
        this.router.navigate(['home']);
        this.sharedService.setData(sportifs);
        this.suggestion = [];
        this.query = '';
        this.isLoading = false;
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
