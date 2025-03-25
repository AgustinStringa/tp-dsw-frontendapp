import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseRoutineCardComponent } from './exercise-routine-card.component';

describe('ExerciseRoutineCardComponent', () => {
  let component: ExerciseRoutineCardComponent;
  let fixture: ComponentFixture<ExerciseRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseRoutineCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
