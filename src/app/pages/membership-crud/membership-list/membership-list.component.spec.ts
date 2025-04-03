import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MembershipListComponent } from './membership-list.component';

describe('MembershipListComponent', () => {
  let component: MembershipListComponent;
  let fixture: ComponentFixture<MembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipListComponent, HttpClientModule],
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
