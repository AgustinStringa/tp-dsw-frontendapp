import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoalDialogComponent } from './goal-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GoalDialogComponent', () => {
  let component: GoalDialogComponent;
  let fixture: ComponentFixture<GoalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalDialogComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<GoalDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Nueva Meta',
            action: 'post',
            client: {
              id: '67e80839ed95d3a4fad842cc',
              firstName: 'cliente',
              lastName: 'cliente',
              dni: '23232323',
              email: 'cliente@yopmail.com',
              isClient: true,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
