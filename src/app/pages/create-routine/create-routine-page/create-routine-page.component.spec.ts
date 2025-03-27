import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutinePageComponent } from './create-routine-page.component';
import { HttpClientModule } from '@angular/common/http';

describe('CreateRoutinePageComponent', () => {
  let component: CreateRoutinePageComponent;
  let fixture: ComponentFixture<CreateRoutinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoutinePageComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoutinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
