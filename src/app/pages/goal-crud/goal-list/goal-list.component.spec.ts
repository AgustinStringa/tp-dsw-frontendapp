import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalListComponent } from './goal-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
