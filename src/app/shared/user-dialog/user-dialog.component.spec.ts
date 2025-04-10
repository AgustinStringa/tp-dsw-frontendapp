import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserDialogComponent } from './user-dialog.component';

const clientServiceMock = {
  getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
};
describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDialogComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRef<UserDialogComponent>,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Nuevo Cliente',
            action: 'post',
            user: undefined,
            crudService: clientServiceMock,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
