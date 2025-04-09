import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ProgressListComponent } from './progress-list.component';

describe('ProgressListComponent', () => {
  let component: ProgressListComponent;
  let fixture: ComponentFixture<ProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
