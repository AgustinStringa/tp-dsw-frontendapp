import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { PayMembershipDialogComponent } from './pay-membership-dialog.component';

const authServiceMock = {
  getUser: jasmine.createSpy('getAll').and.returnValue({
    id: '67cb62486500f106ca25fba3',
  }),
};
describe('PayMembershipDialogComponent', () => {
  let component: PayMembershipDialogComponent;
  let fixture: ComponentFixture<PayMembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayMembershipDialogComponent, HttpClientModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PayMembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
