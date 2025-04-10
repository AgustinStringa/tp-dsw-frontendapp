import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentDialogComponent } from './payment-dialog.component';

describe('PaymentDialogComponent', () => {
  let component: PaymentDialogComponent;
  let fixture: ComponentFixture<PaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDialogComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<PaymentDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Nuevo Pago',
            action: 'post',
            membership: {
              dateFrom: '2025-03-29T03:00:00.000Z',
              dateTo: '2025-04-29T03:00:00.000Z',
              debt: 1500,
              type: {
                id: '67cc593900b230069796bdeb',
                name: 'premium',
                description: 'premium',
                price: 1500,
              },
              client: {
                id: '67e80839ed95d3a4fad842cc',
                lastName: 'cliente',
                firstName: 'cliente',
                dni: '23232323',
              },
              id: '67e8097eed95d3a4fad842cd',
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
