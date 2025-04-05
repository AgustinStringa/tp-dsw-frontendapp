import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsSummaryComponent } from './goals-summary.component';

describe('GoalsSummaryComponent', () => {
  let component: GoalsSummaryComponent;
  let fixture: ComponentFixture<GoalsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
