import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMembershipsListComponent } from './current-memberships-list.component';

describe('CurrentMembershipsListComponent', () => {
  let component: CurrentMembershipsListComponent;
  let fixture: ComponentFixture<CurrentMembershipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentMembershipsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentMembershipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
