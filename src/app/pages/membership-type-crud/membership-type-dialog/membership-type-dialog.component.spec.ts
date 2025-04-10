import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MembershipTypeDialogComponent } from './membership-type-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
          useValue: MatDialogRef<MembershipTypeDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Nuevo Tipo de Membresía',
            action: 'post',
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
