import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfirmRegistrationComponent } from './dialog-confirm-registration.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogConfirmRegistrationComponent', () => {
  let component: DialogConfirmRegistrationComponent;
  let fixture: ComponentFixture<DialogConfirmRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmRegistrationComponent],
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

    fixture = TestBed.createComponent(DialogConfirmRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
