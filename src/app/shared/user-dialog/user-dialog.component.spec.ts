import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogComponent } from './user-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDialogComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'string;',
            action: 'string;',
            user: undefined,
            url: 'string;',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
