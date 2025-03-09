import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTypeDialogComponent } from './membership-type-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('MembershipTypeDialogComponent', () => {
  let component: MembershipTypeDialogComponent;
  let fixture: ComponentFixture<MembershipTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MembershipTypeDialogComponent,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: ' string;',
            action: ' string;',
            membershipType: undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
