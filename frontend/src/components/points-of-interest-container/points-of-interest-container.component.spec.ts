import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfInterestContainerComponent } from './points-of-interest-container.component';

describe('PointsOfInterestContainerComponent', () => {
  let component: PointsOfInterestContainerComponent;
  let fixture: ComponentFixture<PointsOfInterestContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsOfInterestContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PointsOfInterestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
