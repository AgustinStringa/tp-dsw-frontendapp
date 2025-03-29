import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmRegistrationDialogComponent } from './confirm-registration-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmRegistrationDialogComponent', () => {
  let component: ConfirmRegistrationDialogComponent;
  let fixture: ComponentFixture<ConfirmRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRegistrationDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            trainer: 'string;',
            day: 'string;',
            startTime: 'string;',
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
