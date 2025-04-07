import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFilterComponent } from './membership-filter.component';

describe('MembershipFilterComponent', () => {
  let component: MembershipFilterComponent;
  let fixture: ComponentFixture<MembershipFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
