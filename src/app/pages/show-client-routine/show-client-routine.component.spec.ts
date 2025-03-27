import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowClientRoutineComponent } from './show-client-routine.component';

describe('ShowClientRoutineComponent', () => {
  let component: ShowClientRoutineComponent;
  let fixture: ComponentFixture<ShowClientRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowClientRoutineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowClientRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
