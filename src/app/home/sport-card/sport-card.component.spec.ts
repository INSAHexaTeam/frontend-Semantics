import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCardComponent } from './sport-card.component';

describe('SportCardComponent', () => {
  let component: SportCardComponent;
  let fixture: ComponentFixture<SportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
