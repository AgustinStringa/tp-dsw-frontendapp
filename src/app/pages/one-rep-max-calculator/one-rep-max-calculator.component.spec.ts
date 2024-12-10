import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRepMaxCalculatorComponent } from './one-rep-max-calculator.component';

describe('OneRepMaxCalculatorComponent', () => {
  let component: OneRepMaxCalculatorComponent;
  let fixture: ComponentFixture<OneRepMaxCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneRepMaxCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneRepMaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
