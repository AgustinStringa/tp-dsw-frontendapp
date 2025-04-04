import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MembershipDialogComponent } from './membership-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MembershipDialogComponent', () => {
  let component: MembershipDialogComponent;
  let fixture: ComponentFixture<MembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MembershipDialogComponent,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'string',
            action: 'string',
            membership: undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('action should not be falsy', () => {
    expect(component.action).not.toBeFalsy();
  });

  it('action should be put or post', () => {
    expect(component.action).toMatch(/^(put|post)$/);
  });
});
