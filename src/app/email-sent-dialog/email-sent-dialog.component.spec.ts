import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentDialogComponent } from './email-sent-dialog.component';

describe('EmailSentDialogComponent', () => {
  let component: EmailSentDialogComponent;
  let fixture: ComponentFixture<EmailSentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailSentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
