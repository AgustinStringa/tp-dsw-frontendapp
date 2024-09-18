import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import IExercise from '../../../core/interfaces/IExercise.interface.js';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [HttpClientModule, MatIconModule],
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.css',
})
export class ExercisesListComponent {
  exercises: IExercise[] | undefined = [];
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getExercises();
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getExercises();
    });
  }

  getExercises() {
    try {
      this.http.get<any>(environment.exercisesUrl).subscribe((res) => {
        this.exercises = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  editExercise(e: IExercise): void {
    // this.openDialog()
  }

  removeExercise(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'exercises',
      title: 'Eliminar ejercicio',
    });
  }
}
