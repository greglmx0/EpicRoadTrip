import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlacesOfInterestComponent } from './search-places-of-interest.component';

describe('SearchPlacesOfInterestComponent', () => {
  let component: SearchPlacesOfInterestComponent;
  let fixture: ComponentFixture<SearchPlacesOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPlacesOfInterestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPlacesOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
