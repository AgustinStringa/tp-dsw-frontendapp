import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerListComponent } from './trainer-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('TrainerListComponent', () => {
  let component: TrainerListComponent;
  let fixture: ComponentFixture<TrainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
