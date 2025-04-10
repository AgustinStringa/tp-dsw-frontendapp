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
      dateFrom: new Date('2025-04-08T03:00:00.000Z'),
      dateTo: new Date('2025-05-08T03:00:00.000Z'),
      debt: 0,
      type: {
        id: '67cc593900b230069796bdeb',
        name: 'premium',
        description: 'premium',
        price: 1500,
      },
      client: {
        email: 'stringaagu@hotmail.com',
        id: '67cc591c00b230069796bde9',
        lastName: 'stri',
        firstName: 'agu',
        dni: '44607086',
      },
      id: '67f586cd869cf958064a86ac',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
