import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private result = new BehaviorSubject<any>(null);
  private input = new BehaviorSubject<any>(null);
  data$ = this.result.asObservable();
  input$ = this.result.asObservable();
  setData(data: any): void {
    this.result.next(data);
  }
  setInput(data: any): void {
    this.input.next(data);
  }
}
