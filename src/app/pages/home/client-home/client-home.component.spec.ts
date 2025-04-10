import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientHomeComponent } from './client-home.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ClientHomeComponent', () => {
  let component: ClientHomeComponent;
  let fixture: ComponentFixture<ClientHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientHomeComponent, HttpClientModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
