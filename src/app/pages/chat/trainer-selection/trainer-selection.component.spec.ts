import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSelectionComponent } from './trainer-selection.component';

describe('TrainerSelectionComponent', () => {
  let component: TrainerSelectionComponent;
  let fixture: ComponentFixture<TrainerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
