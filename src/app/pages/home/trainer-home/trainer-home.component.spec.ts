import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { TrainerHomeComponent } from './trainer-home.component';

describe('TrainerHomeComponent', () => {
  let component: TrainerHomeComponent;
  let fixture: ComponentFixture<TrainerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerHomeComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
