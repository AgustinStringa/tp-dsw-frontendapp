import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDialogComponent } from './exercise-dialog.component';

describe('ExerciseDialogComponent', () => {
  let component: ExerciseDialogComponent;
  let fixture: ComponentFixture<ExerciseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
