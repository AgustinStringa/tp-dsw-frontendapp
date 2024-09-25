import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTypesListComponent } from './membership-types-list.component';

describe('MembershipTypesListComponent', () => {
  let component: MembershipTypesListComponent;
  let fixture: ComponentFixture<MembershipTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipTypesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
