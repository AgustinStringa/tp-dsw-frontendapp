import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewExerciseRoutineDialogComponent } from './new-exercise-routine-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewExerciseRoutineDialogComponent', () => {
  let component: NewExerciseRoutineDialogComponent;
  let fixture: ComponentFixture<NewExerciseRoutineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExerciseRoutineDialogComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<NewExerciseRoutineDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            exercises: [],
            exerciseSelected: null,
            series: 0,
            repetitions: 0,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewExerciseRoutineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
