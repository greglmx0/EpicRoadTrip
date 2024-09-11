import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCheckboxSelectorComponent } from './activity-checkbox-selector.component';

describe('ActivityCheckboxSelectorComponent', () => {
  let component: ActivityCheckboxSelectorComponent;
  let fixture: ComponentFixture<ActivityCheckboxSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCheckboxSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityCheckboxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
