import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipDialogComponent } from './membership-dialog.component';

describe('MembershipsDialogComponent', () => {
  let component: MembershipDialogComponent;
  let fixture: ComponentFixture<MembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
