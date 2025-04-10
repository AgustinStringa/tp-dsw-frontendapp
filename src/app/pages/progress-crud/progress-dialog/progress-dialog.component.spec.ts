import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressDialogComponent } from './progress-dialog.component';

describe('ProgressDialogComponent', () => {
  let component: ProgressDialogComponent;
  let fixture: ComponentFixture<ProgressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProgressDialogComponent,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<ProgressDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Nuevo Progreso',
            action: 'post',
            client: {
              id: '67e80839ed95d3a4fad842cc',
              firstName: 'cliente',
              lastName: 'cliente',
              dni: '23232323',
              email: 'cliente@yopmail.com',
              isClient: true,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
