import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTypesDialogComponent } from './membership-types-dialog.component';

describe('MembershipTypesDialogComponent', () => {
  let component: MembershipTypesDialogComponent;
  let fixture: ComponentFixture<MembershipTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipTypesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
