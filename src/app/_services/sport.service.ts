import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiURL } from '../_interfaces/api-url';
import { Sport } from '../_interfaces/sport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private http: HttpClient) { }

  getAllOlympicSports(): Observable<Sport[]> {
    return this.http.get(`${ApiURL}/fetchAllOlympicSports`) as Observable<
      Sport[]
    >;
  }
}
