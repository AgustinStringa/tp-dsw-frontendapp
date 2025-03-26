import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMembershipDialogComponent } from './pay-membership-dialog.component';

describe('PayMembershipDialogComponent', () => {
  let component: PayMembershipDialogComponent;
  let fixture: ComponentFixture<PayMembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayMembershipDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayMembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
