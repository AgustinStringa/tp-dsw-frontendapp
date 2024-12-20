import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExercisesListComponent } from '../../exercise-crud/exercise-list/exercise-list.component';

describe('ExercisesListComponent', () => {
  let component: ExercisesListComponent;
  let fixture: ComponentFixture<ExercisesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
