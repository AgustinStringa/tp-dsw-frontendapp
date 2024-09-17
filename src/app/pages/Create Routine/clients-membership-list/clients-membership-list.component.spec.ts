import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMembershipListComponent } from './clients-membership-list.component';

describe('ClientsMembershipListComponent', () => {
  let component: ClientsMembershipListComponent;
  let fixture: ComponentFixture<ClientsMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsMembershipListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
