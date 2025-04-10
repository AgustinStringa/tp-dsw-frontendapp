import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseDialogComponent } from './exercise-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExerciseDialogComponent', () => {
  let component: ExerciseDialogComponent;
  let fixture: ComponentFixture<ExerciseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExerciseDialogComponent,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<ExerciseDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            action: 'post',
            title: 'Nuevo ejercicio',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
