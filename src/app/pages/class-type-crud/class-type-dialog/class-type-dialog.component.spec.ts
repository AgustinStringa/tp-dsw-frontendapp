import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassTypeDialogComponent } from './class-type-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClassTypeDialogComponent', () => {
  let component: ClassTypeDialogComponent;
  let fixture: ComponentFixture<ClassTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClassTypeDialogComponent,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<ClassTypeDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Crear Tipo de clase',
            action: 'post',
            classType: undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
