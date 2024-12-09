import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiURL } from '../_interfaces/api-url';
import { Sportif } from '../_interfaces/sportif';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportifService {
  constructor(private http: HttpClient) {}

  getAllSportifs(): Observable<Sportif[]> {
    return this.http.get(`${ApiURL}/fetchFrenchAthletes`) as Observable<
      Sportif[]
    >;
  }

  getSportifByName(name: string): Observable<Sportif[]> {
    if (!name) {
      return this.getAllSportifs();
    }
    return this.http.get(
      `${ApiURL}/fetchAthleteByName?name=${name}`
    ) as Observable<Sportif[]>;
  }
  getSportifInfo(id: string): Observable<Sportif> {
    return this.http.get(
      `${ApiURL}/fetchAthleteInformations?athleteId=${id}`
    ) as Observable<Sportif>;
  }
}
