import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ComponentType } from '@angular/cdk/portal';
import { CustomPaginatorIntl } from '../../../core/classes/custom-paginator-intl';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { TrainerService } from '../../../core/services/trainer.service';
import { UserDialogComponent } from '../../../shared/user-dialog/user-dialog.component';
import { UsersFilterComponent } from '../../../shared/users-filter/users-filter.component';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, UsersFilterComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css',
})
export class TrainerListComponent {
  @ViewChild(UsersFilterComponent) filter!: UsersFilterComponent;

  trainers: IUser[] | null = null;
  trainersPage: IUser[] | null = null;
  trainersExist = false;
  pageSize = 50;

  constructor(
    public trainerService: TrainerService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  receiveTrainers(data: { users: IUser[]; usersExist: boolean } | null) {
    if (data === null) {
      this.trainers = null;
    } else {
      this.trainers = data.users;
      this.trainersExist = data.usersExist;

      const e = new PageEvent();
      e.length = this.trainers.length;
      e.pageIndex = 0;
      e.pageSize = this.pageSize;
      this.handlePageEvent(e);
    }
  }

  handlePageEvent(e: PageEvent) {
    if (this.trainers !== null) {
      const start = e.pageIndex * e.pageSize;
      const end = (e.pageIndex + 1) * e.pageSize;
      this.trainersPage = [...this.trainers.slice(start, end)];
    }
  }

  getTrainers() {
    this.trainerService.getAll().subscribe({
      next: (res) => {
        this.trainers = res.data;
        this.trainersExist = this.trainers.length > 0;

        const e = new PageEvent();
        e.length = this.trainers.length;
        e.pageIndex = 0;
        e.pageSize = this.pageSize;
        this.handlePageEvent(e);
      },
      error: () => {
        this.trainers = null;
      },
    });
  }

  addTrainer(): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Nuevo Entrenador',
        action: 'post',
        crudService: this.trainerService,
      },
    });
  }

  updateTrainer(trainer: IUser): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Modificar Entrenador',
        action: 'put',
        user: trainer,
        crudService: this.trainerService,
      },
    });
  }

  deleteTrainer(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Entrenador',
        service: this.trainerService,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.filter.getUsers();
        if (result === 'created') {
          this.snackbarService.showSuccess('Entrenador registrado.');
        } else if (result === 'updated') {
          this.snackbarService.showSuccess('Entrenador actualizado.');
        } else if (result === 'deleted') {
          this.snackbarService.showError('Entrenador eliminado.');
        }
      }
    });
  }
}
