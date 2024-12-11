import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImlgCalculatorComponent } from './imlg-calculator.component';

describe('ImlgCalculatorComponent', () => {
  let component: ImlgCalculatorComponent;
  let fixture: ComponentFixture<ImlgCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImlgCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImlgCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
