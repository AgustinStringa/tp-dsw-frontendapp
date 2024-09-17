import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment.js';
import IExercise from '../../../core/interfaces/IExercise.interface.js';
@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.css',
})
export class ExercisesListComponent {
  exercises: IExercise[] | undefined = [];
  constructor(private http: HttpClient) {
    this.getExercises();
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
}
