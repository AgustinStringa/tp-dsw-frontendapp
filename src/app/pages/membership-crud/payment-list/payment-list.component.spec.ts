import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { PaymentListComponent } from './payment-list.component';

describe('PaymentListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    component.membership = {
      id: 'string;',
      dateFrom: new Date(),
      dateTo: new Date(),
      type: {
        id: '',
        name: '',
        price: 0,
        description: '',
      },
      client: {
        id: '',
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
