import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassTypeListComponent } from './class-type-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ClassTypeListComponent', () => {
  let component: ClassTypeListComponent;
  let fixture: ComponentFixture<ClassTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassTypeListComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
