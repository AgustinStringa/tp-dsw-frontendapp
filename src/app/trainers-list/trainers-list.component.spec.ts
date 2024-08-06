import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersListComponent } from './trainers-list.component';

describe('TrainersListComponent', () => {
  let component: TrainersListComponent;
  let fixture: ComponentFixture<TrainersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
