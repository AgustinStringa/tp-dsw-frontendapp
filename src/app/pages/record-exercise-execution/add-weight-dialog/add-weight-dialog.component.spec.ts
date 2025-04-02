import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightDialogComponent } from './add-weight-dialog.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddWeightDialogComponent', () => {
  let component: AddWeightDialogComponent;
  let fixture: ComponentFixture<AddWeightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeightDialogComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
