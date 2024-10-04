import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsListComponent } from './memberships-list.component';

describe('MembershipsListComponent', () => {
  let component: MembershipsListComponent;
  let fixture: ComponentFixture<MembershipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
