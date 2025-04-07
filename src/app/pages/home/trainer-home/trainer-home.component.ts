import {
  HomeService,
  ITrainerHomeInformation,
} from '../../../core/services/home.service';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-trainer-home',
  standalone: true,
  imports: [],
  templateUrl: './trainer-home.component.html',
  styleUrl: './trainer-home.component.css',
})
export class TrainerHomeComponent {
  trainerInformation!: ITrainerHomeInformation;

  constructor(
    private homeService: HomeService,
    private snackbarService: SnackbarService
  ) {
    this.getInformation();
  }

  getInformation() {
    this.homeService.getInformationForTrainer().subscribe({
      next: (res) => {
        this.trainerInformation = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener las estadísticas del gimnasio.'
          );
      },
    });
  }
}
