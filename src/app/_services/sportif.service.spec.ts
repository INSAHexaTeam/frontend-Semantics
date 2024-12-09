import { TestBed } from '@angular/core/testing';

import { SportifService } from './sportif.service';

describe('SportifService', () => {
  let service: SportifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
