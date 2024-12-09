import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportifDetailsComponent } from './sportif-details.component';

describe('SportifDetailsComponent', () => {
  let component: SportifDetailsComponent;
  let fixture: ComponentFixture<SportifDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportifDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
