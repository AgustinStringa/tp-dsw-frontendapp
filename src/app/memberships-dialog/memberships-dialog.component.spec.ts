import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsDialogComponent } from './memberships-dialog.component';

describe('MembershipsDialogComponent', () => {
  let component: MembershipsDialogComponent;
  let fixture: ComponentFixture<MembershipsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
