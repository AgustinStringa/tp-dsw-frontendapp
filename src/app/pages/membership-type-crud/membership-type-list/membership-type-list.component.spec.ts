import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTypeListComponent } from './membership-type-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('MembershipTypeListComponent', () => {
  let component: MembershipTypeListComponent;
  let fixture: ComponentFixture<MembershipTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipTypeListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
