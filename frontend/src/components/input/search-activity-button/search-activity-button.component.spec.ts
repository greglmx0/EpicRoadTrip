import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActivityButtonComponent } from './search-activity-button.component';

describe('SearchActivityButtonComponent', () => {
  let component: SearchActivityButtonComponent;
  let fixture: ComponentFixture<SearchActivityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchActivityButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchActivityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
