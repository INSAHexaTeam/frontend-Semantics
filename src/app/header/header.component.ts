import { Sportif } from '../_interfaces/sportif';
import { SportifService } from './../_services/sportif.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private sportifService: SportifService) {
    console.log('HeaderComponent');
    this.sportifService.getAllSportifs().subscribe((data: Sportif[]) => {
      console.log(data);
    });
  }
}
