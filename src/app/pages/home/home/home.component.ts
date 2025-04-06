import { AuthService } from '../../../core/services/auth.service';
import { ClientHomeComponent } from '../client-home/client-home.component';
import { ClientService } from '../../../core/services/client.service';
import { Component } from '@angular/core';
import { IClientHomeInformation } from '../../../core/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainerService } from '../../../core/services/trainer.service';
import { UserDialogComponent } from '../../../shared/user-dialog/user-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ClientHomeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public userSignal = this.authService.userSignal;
  public homeInformation: IClientHomeInformation | undefined;
  public formatedDateTo: string | null = null;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private clientService: ClientService,
    private trainerService: TrainerService
  ) {}

  updateData() {
    const user = this.authService.getUser();

    const data = {
      title: 'Modificar Mis Datos',
      action: user?.isClient ? 'patch' : 'put',
      user,
      crudService: user?.isClient ? this.clientService : this.trainerService,
    };

    const dialogRef = this.dialog.open(UserDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.authService.extendSession();
      }
    });
  }
}
