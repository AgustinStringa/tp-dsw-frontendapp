import { PaymentMethodEnum } from '../enums/payment-method.enum';

export interface IPayment {
  id: string;
  dateTime: Date;
  paymentMethod: PaymentMethodEnum;
  amount: number;
  membership: string; //membershipId
  //status
  //stripe;
}
