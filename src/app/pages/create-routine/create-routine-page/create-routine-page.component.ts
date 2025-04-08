import {
  addDays,
  addHours,
  addWeeks,
  format,
  lightFormat,
  parse,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { AfterViewChecked, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IRoutineCreate,
  RoutineService,
} from '../../../core/services/routine.service';
import { AuthService } from '../../../core/services/auth.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import Client from '../../../core/classes/client';
import { ClientsMembershipListComponent } from '../clients-membership-list/clients-membership-list.component';
import { ExerciseRoutineCardComponent } from '../exercise-routine-card/exercise-routine-card.component';
import { ExerciseService } from '../../../core/services/exercise.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IExercise } from '../../../core/interfaces/exercise.interface';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MembershipService } from '../../../core/services/membership.service';
import { NewExerciseRoutineDialogComponent } from '../new-exercise-routine-dialog/new-exercise-routine-dialog.component';
import { SnackbarService } from '../../../core/services/snackbar.service';

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
    ClientsMembershipListComponent,
    MatIconModule,
    ExerciseRoutineCardComponent,
  ],
  templateUrl: './create-routine-page.component.html',
  styleUrl: './create-routine-page.component.css',
})
export class CreateRoutinePageComponent implements AfterViewChecked {
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
  clients: Client[] = [];
  exercises: object[] = [];
  today: Date = new Date();
  trainerId: string | undefined = '';
  isClientSelected = false;
  firstMonday = lightFormat(addDays(startOfWeek(new Date()), 1), 'yyyy-MM-dd');

  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private routineService: RoutineService,
    private exerciseService: ExerciseService,
    private membershipService: MembershipService,
    private snackbarService: SnackbarService
  ) {
    this.getClientsWithActiveMembership();
    this.getExercises();
  }

  ngAfterViewChecked(): void {
    if (this.isClientSelected) {
      this.startUpDatePicker();
    }
  }

  getClientsWithActiveMembership() {
    this.membershipService.getActive().subscribe({
      next: (res) => {
        this.clients = [];

        Array.from(res.data).forEach((m: IMembership) => {
          this.clients = [
            ...this.clients,
            new Client(
              m.client.id,
              m.client.lastName,
              m.client.firstName,
              m.client.dni,
              m.client.email,
              {
                id: m.id,
                dateFrom: m.dateFrom,
                dateTo: m.dateTo,
                type: m.type,
                client: m.client,
              }
            ),
          ];
        });
      },
      error: (err) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener los clientes con membresías vigentes.'
          );
      },
    });
  }

  getExercises() {
    this.exerciseService.getAll().subscribe({
      next: (res) => {
        this.exercises = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else this.snackbarService.showError('Error al obtener los ejercicios.');
      },
    });
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
          addWeeks(
            startOfDay(addHours(this.routineForm.value.dateFrom, 3)),
            weeksToAdd
          )
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

  async startUpDatePicker() {
    const inputDateFrom = document.querySelector(
      '#inputDateFrom'
    ) as HTMLInputElement;
    if (inputDateFrom == null) return;
    inputDateFrom.min = this.firstMonday;
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
    const dialogRef = this.dialog.open(NewExerciseRoutineDialogComponent, {
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
    this.isClientSelected = newSelectedClient !== null;
    if (this.isClientSelected) {
      this.startUpDatePicker();
    }
  }

  onSubmit() {
    const form = this.routineForm.value;
    const newRoutine: IRoutineCreate = {
      clientId: form.client!.id,
      start: parseISO(form.dateFrom || ''),
      end: form.dateTo!,
      exercisesRoutine: this.routineForm.value.exercisesRoutine!.map((ex) => ({
        week: ex.week,
        day: ex.day,
        series: ex.series,
        repetitions: ex.repetitions,
        exercise: ex.exercise.id,
      })),
    };

    this.routineService.create(newRoutine).subscribe({
      next: () => {
        this.snackbarService
          .showSuccess('Rutina creada correctamente.')
          .afterDismissed()
          .subscribe(() => {
            this.resetForm();
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          });
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly) {
          this.snackbarService.showError(err.error.message);
        } else {
          this.snackbarService.showError('Error al crear la rutina.');
        }
      },
    });
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

  resetForm(): void {
    this.routineForm.patchValue({
      client: null,
      dateFrom: '',
      dateTo: null,
      exercisesRoutine: [],
    });
    this.weeks = [];
    this.getClientsWithActiveMembership();
    this.getExercises();
  }
}
