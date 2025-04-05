import { Component, Input, OnInit } from '@angular/core';
import {
  HomeService,
  IClientHomeInformation,
} from '../../../core/services/home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PayMembershipDialogComponent } from '../../client-payment/pay-membership-dialog/pay-membership-dialog.component';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [],
  templateUrl: './client-home.component.html',
})
export class ClientHomeComponent implements OnInit {
  @Input({ required: true }) clientId: string | undefined;

  public clientInformation: IClientHomeInformation | undefined;
  public formatedDateTo: string | null = null;
  public membershipName: string | null = null;

  constructor(
    private homeService: HomeService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getInformation();
  }

  getInformation() {
    if (this.clientId !== undefined)
      this.homeService.getInformationForClient().subscribe({
        next: (res) => {
          console.log(res);
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

            console.log(this.membershipName);
            console.log(this.formatedDateTo);
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
    const dialogRef = this.dialog.open(PayMembershipDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      //TODO llamar a webhooj o a getInformation??
    });
  }
}
