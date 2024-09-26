import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfirmRegistrationComponent } from './dialog-confirm-registration.component';

describe('DialogConfirmRegistrationComponent', () => {
  let component: DialogConfirmRegistrationComponent;
  let fixture: ComponentFixture<DialogConfirmRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
