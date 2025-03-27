import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      getUser: jasmine.createSpy('getUser'),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login component should call Authservice.getUser on ngOnInit', async () => {
    spyOn(AuthService.prototype, 'getUser');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.authService.getUser).toHaveBeenCalledTimes(1);
  });
});
