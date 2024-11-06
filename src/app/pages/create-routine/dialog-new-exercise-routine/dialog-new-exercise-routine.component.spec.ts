import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewExerciseRoutineComponent } from './dialog-new-exercise-routine.component';

describe('DialogNewExerciseRoutineComponent', () => {
  let component: DialogNewExerciseRoutineComponent;
  let fixture: ComponentFixture<DialogNewExerciseRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewExerciseRoutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewExerciseRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
