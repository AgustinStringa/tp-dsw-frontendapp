import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  startOfWeek,
  addDays,
  lightFormat,
  addWeeks,
  parseISO,
  startOfDay,
  addHours,
  format,
  parse,
} from 'date-fns';
import { Component, inject, AfterViewInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Client from '../../../core/classes/client.js';
import { ClientsMembershipListComponent } from '../clients-membership-list/clients-membership-list.component.js';
import { DialogNewExerciseRoutineComponent } from '../dialog-new-exercise-routine/dialog-new-exercise-routine.component.js';
import { environment } from '../../../../environments/environment.js';
import { ExerciseRoutineCardComponent } from '../exercise-routine-card/exercise-routine-card.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface.js';

interface Day {
  exercisesRoutine?: IExerciseRoutine[];
  number: number;
  weekNumber: number;
}

interface Week {
  days: Day[];
  text: string;
  number: number;
}

export interface DialogData {
  exercises: IExercise[];
  exerciseSelected: IExercise;
  series: number;
  repetitions: number;
}

@Component({
  selector: 'app-create-routine-page',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    HttpClientModule,
    ClientsMembershipListComponent,
    MatIconModule,
    NgClass,
    ExerciseRoutineCardComponent,
  ],
  templateUrl: './create-routine-page.component.html',
  styleUrl: './create-routine-page.component.css',
})
export class CreateRoutinePageComponent implements AfterViewInit {
  routineForm = new FormGroup({
    dateFrom: new FormControl('', Validators.required),
    dateTo: new FormControl<Date | null>(null, Validators.required),
    client: new FormControl<Client | null>(null, Validators.required),
    exercisesRoutine: new FormControl<IExerciseRoutine[]>(
      [],
      [Validators.minLength(1), Validators.required]
    ),
  });

  weeks: Week[] = [];
  expandedIndex = 0;
  clientsWithmembership: Client[] = [];
  exercises: Object[] = [];
  today: Date = new Date();

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, private router: Router) {
    this.getClientsWithMembership();
    this.getExercises();
  }

  public ngAfterViewInit(): void {
    this.startUpDatePicker();
  }

  getClientsWithMembership() {
    try {
      this.http
        .get<any>(environment.membershipsActive)
        .subscribe((res: any) => {
          Array.from(res.data).forEach((m: any) => {
            this.clientsWithmembership = [
              ...this.clientsWithmembership,
              new Client(
                m.client.id,
                m.client.lastName,
                m.client.firstName,
                m.client.dni,
                m.client.email,
                {
                  dateFrom: m.dateFrom,
                  dateTo: m.dateTo,
                  type: m.type,
                  client: m.client,
                }
              ),
            ];
          });
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  getExercises() {
    try {
      this.http.get<any>(environment.exercisesUrl).subscribe((res: any) => {
        this.exercises = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  setDateTo() {
    const weeksToAdd = this.weeks.length;
    if (
      this.routineForm.value.dateFrom != undefined &&
      this.routineForm.value.dateFrom != null &&
      this.routineForm.value.dateFrom != ''
    ) {
      this.routineForm.patchValue({
        dateFrom: format(
          startOfDay(addHours(this.routineForm.value.dateFrom, 3)),
          'yyyy-MM-dd'
        ),
      });
      this.routineForm.patchValue({
        dateTo: startOfDay(
          addWeeks(this.routineForm.value.dateFrom, weeksToAdd)
        ),
      });
    }
  }

  getDateToWithFormat() {
    if (
      this.routineForm.value.dateTo != null &&
      this.routineForm.value.dateTo != undefined
    ) {
      return lightFormat(this.routineForm.value.dateTo, 'dd/MM/yyy');
    } else return '';
  }

  startUpDatePicker() {
    const inputDateFrom = document.querySelector(
      '#inputDateFrom'
    ) as HTMLInputElement;
    const firstMonday = lightFormat(
      addDays(startOfWeek(new Date()), 1),
      'yyyy-MM-dd'
    );
    inputDateFrom.min = firstMonday;
    inputDateFrom.step = '7';
    this.setDateTo();
  }

  addweek() {
    this.weeks.push({
      number: this.weeks.length + 1,
      text: 'SEMANA ' + (this.weeks.length + 1),
      days: [],
    });
    this.setDateTo();
  }

  removeWeek(week: Week) {
    this.weeks = this.weeks.filter((w) => w.number != week.number);
    this.setDateTo();
  }

  addExercise(day: Day) {
    const dialogRef = this.dialog.open(DialogNewExerciseRoutineComponent, {
      data: {
        exercises: this.exercises,
        exerciseSelected: null,
        series: 1,
        repetitions: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result.exerciseSelected != null) {
        const newIExerciseRoutine = {
          exercise: result.exerciseSelected,
          series: result.series,
          repetitions: result.repetitions,
          day: day.number,
          week: day.weekNumber,
        };
        this.routineForm.patchValue({
          exercisesRoutine: [
            ...(this.routineForm.value.exercisesRoutine ?? []),
            newIExerciseRoutine,
          ],
        });
        day.exercisesRoutine?.push({
          ...newIExerciseRoutine,
          internalIndex: day.exercisesRoutine.length,
        });
      }
    });
  }

  removeExercise(day: Day, exercise: IExerciseRoutine) {
    day.exercisesRoutine = day.exercisesRoutine?.filter(
      (exr) => exr.internalIndex != exercise.internalIndex
    );
  }

  addDay(week: Week) {
    if (week.days.length < 7) {
      week.days.push({
        number: week.days.length + 1,
        exercisesRoutine: [],
        weekNumber: week.number,
      });
    }
  }

  removeDay(day: Day) {
    const week = this.weeks.find((w) => w.number == day.weekNumber);
    if (week) {
      week.days = week?.days.filter((d) => d.number != day.number);
    }
  }

  setSelectedClient(newSelectedClient: Client | null) {
    this.routineForm.patchValue({
      client: newSelectedClient,
    });
  }

  onSubmit() {
    //validaciones variadas
    /**
     * fecha desde mayor o igual a hoy
     * superposicion de rutinas? o bloquear rango si superpone?
     * verificar que exista al menos una semana con un dia con un ejercicio -> si no, rutina vacia
     */
    //post
    //mensaje de exito XOR error
    const newRoutine = {
      trainer: '66e9aa2e294b5091cfb08eb0',
      client: this.routineForm.value.client?.id,
      start: parseISO(this.routineForm.value.dateFrom || ''),
      end: this.routineForm.value.dateTo,
      exercisesRoutine: this.routineForm.value.exercisesRoutine?.map((ex) => ({
        week: ex.week,
        day: ex.day,
        series: ex.series,
        repetitions: ex.repetitions,
        weight: 0,
        exercise: ex.exercise?.id,
      })),
    };
    try {
      this.http
        .post<any>(environment.routinesUrl, newRoutine)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (
              error.status === 400 &&
              error.error.message == 'There is overlap between routines'
            ) {
              this._snackBar.open(
                'Hay solapamiento entre fechas de rutinas',
                'cerrar',
                {
                  duration: 3000,
                  panelClass: ['snackbar_error'],
                }
              );
            } else {
              this._snackBar.open('Error al crear la rutina', 'cerrar', {
                duration: 3000,
                panelClass: ['snackbar_error'],
              });
            }

            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          this._snackBar
            .open('Rutina creada correctamente', 'cerrar', {
              duration: 3000,
              panelClass: ['snackbar_success'],
            })
            .afterDismissed()
            .subscribe((info) => {
              this.reloadCurrentRoute();
            });
        });
    } catch (error: any) {}
  }

  handleInputDateFrom() {
    if (
      this.routineForm.value.dateFrom == null ||
      this.routineForm.value.dateFrom == undefined
    )
      return;
    const firstMonday = addDays(startOfWeek(new Date()), 1);
    const dateFromValue = parse(
      this.routineForm.value.dateFrom,
      'yyyy-MM-dd',
      new Date()
    );
    if (dateFromValue < firstMonday || dateFromValue.getDay() != 1) {
      this.routineForm.patchValue({
        dateFrom: lightFormat(firstMonday, 'yyyy-MM-dd'),
      });
    }
    this.setDateTo();
  }

  reloadCurrentRoute() {
    //ES UNA SOLUCION BASTANTE CUTRE, PERO CUMPLE
    window.location.reload();
  }
}
