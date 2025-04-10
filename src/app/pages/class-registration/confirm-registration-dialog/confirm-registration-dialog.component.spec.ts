import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmRegistrationDialogComponent } from './confirm-registration-dialog.component';

describe('ConfirmRegistrationDialogComponent', () => {
  let component: ConfirmRegistrationDialogComponent;
  let fixture: ComponentFixture<ConfirmRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRegistrationDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<ConfirmRegistrationDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            trainer: '67c245acc6a960406b0c17b7',
            day: 'Martes',
            startTime: '9:00',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
