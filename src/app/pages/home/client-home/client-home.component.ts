import {
  HomeService,
  IClientHomeInformation,
} from '../../../core/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PayMembershipDialogComponent } from '../../client-payment/pay-membership-dialog/pay-membership-dialog.component';
import { PaymentService } from '../../../core/services/payment.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [],
  templateUrl: './client-home.component.html',
})
export class ClientHomeComponent {
  public clientInformation: IClientHomeInformation | undefined;
  public formatedDateTo: string | null = null;
  public membershipName: string | null = null;

  constructor(
    private homeService: HomeService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) {
    this.getInformation();
    this.getQueryParams();
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const stripeId = params['stripe_id'] || null;

      if (stripeId) {
        const url = new URL(window.location.href);
        url.searchParams.delete('stripe_id');
        window.history.replaceState({}, '', url.toString());

        this.paymentService.checkPaymentStatus(stripeId).subscribe({
          next: (res) => {
            if (res.status === 200) this.getInformation();
          },
        });
      }
    });
  }

  getInformation() {
    this.homeService.getInformationForClient().subscribe({
      next: (res) => {
        this.clientInformation = res.data;

        if (this.clientInformation.currentMembership !== null) {
          const date = new Date(
            this.clientInformation.currentMembership.dateTo
          );

          this.formatedDateTo = `${date.getDay() + 1}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;

          this.membershipName =
            this.clientInformation.currentMembership.type.name;
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener la información del cliente.'
          );
      },
    });
  }

  openPayMembershipModal() {
    this.dialog.open(PayMembershipDialogComponent);
  }
}
