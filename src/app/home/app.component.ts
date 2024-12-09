import { SharedDataService } from './../_services/shared-data.service';
import { SportifService } from '../_services/sportif.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Sportif } from '../_interfaces/sportif';
import { Head } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  sportifs: Sportif[] = [];
  sportifs_display: Sportif[] = [];
  title = 'app';
  has_list: boolean = false;

  constructor(
    private sportifService: SportifService,
    private sharedDataService: SharedDataService
  ) {
    this.sportifService.getAllSportifs().subscribe((data: Sportif[]) => {
      this.sportifs = data;
      this.sportifs_display = data;
      this.sharedDataService.setData(data);

      this.display();
    });
  }
  handleListsUpdate(updatedLists: { searchResult: Sportif[] }) {
    this.sportifs_display = updatedLists.searchResult;
    this.display();
  }
  display() {
    this.has_list = this.sportifs.length > 0;
  }
}
