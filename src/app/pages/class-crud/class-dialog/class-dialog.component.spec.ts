import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassDialogComponent } from './class-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClassDialogComponent', () => {
  let component: ClassDialogComponent;
  let fixture: ComponentFixture<ClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDialogComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Crear Clase',
            action: 'post',
            trainers: [],
            classTypes: [],
            class_a: undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
