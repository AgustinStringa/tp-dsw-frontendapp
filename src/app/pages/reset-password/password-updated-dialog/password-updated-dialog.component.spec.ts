import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdatedDialogComponent } from './password-updated-dialog.component';

describe('PasswordUpdatedDialogComponent', () => {
  let component: PasswordUpdatedDialogComponent;
  let fixture: ComponentFixture<PasswordUpdatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordUpdatedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordUpdatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
