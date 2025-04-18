import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { UsersFilterComponent } from './users-filter.component';

describe('UsersFilterComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async () => {
    const clientServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
    };
    await TestBed.configureTestingModule({
      imports: [UsersFilterComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    component.crudService = clientServiceMock as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call getUsers() in constructor', () => {
  //   spyOn(UsersFilterComponent.prototype, 'getUsers');

  //   fixture = TestBed.createComponent(UsersFilterComponent);
  //   component = fixture.componentInstance;

  //   expect(component.getUsers).toHaveBeenCalledTimes(1);
  // });

  // it('sendFilteredUsers should invoke eventEmitter.emit', () => {
  //   fixture = TestBed.createComponent(UsersFilterComponent);
  //   component = fixture.componentInstance;
  //   spyOn(component.filteredUsersEvent, 'emit');

  //   component.applyFilter();

  //   expect(component.filteredUsersEvent.emit).toHaveBeenCalled();
  // });

  // it('on this enviroment, endFilteredUsers should invoke eventEmitter.emit and emit null ', () => {
  //   fixture = TestBed.createComponent(UsersFilterComponent);
  //   component = fixture.componentInstance;
  //   spyOn(component.filteredUsersEvent, 'emit');

  //   component.applyFilter();

  //   expect(component.filteredUsersEvent.emit).toHaveBeenCalledWith(null);
  // });

  // it('endFilteredUsers should invoke eventEmitter.emit and emit NOT null ', () => {
  //   fixture = TestBed.createComponent(UsersFilterComponent);
  //   component = fixture.componentInstance;
  //   spyOn(component.filteredUsersEvent, 'emit');

  //   component.applyFilter();

  //   expect(component.filteredUsersEvent.emit).toHaveBeenCalledWith({
  //     users: [],
  //     usersExist: true,
  //   });
  // });
});
