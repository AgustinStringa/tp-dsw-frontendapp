import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewExerciseRoutineComponent } from './dialog-new-exercise-routine.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogNewExerciseRoutineComponent', () => {
  let component: DialogNewExerciseRoutineComponent;
  let fixture: ComponentFixture<DialogNewExerciseRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewExerciseRoutineComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
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

    fixture = TestBed.createComponent(DialogNewExerciseRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
