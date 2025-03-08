import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipListComponent } from './membership-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

xdescribe('MembershipsListComponent', () => {
  let component: MembershipListComponent;
  let fixture: ComponentFixture<MembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipListComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
