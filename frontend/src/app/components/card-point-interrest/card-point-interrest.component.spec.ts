import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPointInterrestComponent } from './card-point-interrest.component';

describe('CardPointInterrestComponent', () => {
  let component: CardPointInterrestComponent;
  let fixture: ComponentFixture<CardPointInterrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPointInterrestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPointInterrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
