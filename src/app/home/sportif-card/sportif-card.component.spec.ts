import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportifCardComponent } from './sportif-card.component';

describe('SportifCardComponent', () => {
  let component: SportifCardComponent;
  let fixture: ComponentFixture<SportifCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportifCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportifCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
