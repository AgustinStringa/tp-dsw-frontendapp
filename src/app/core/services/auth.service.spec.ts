import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUser should return an IUser', () => {
    expect(service.getUser()).not.toBeFalsy();
  });
});
