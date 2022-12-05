import { fakeAsync, TestBed } from '@angular/core/testing';
import { EmployeeModel } from '../models/employee-model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { CookieModule } from 'ngx-cookie';
export const mockUser: EmployeeModel[] = [{
  id:'uid1',
  firstName:'testFName',
  middleName:'testMName',
  lastName:'testLName',
  email:'test@test.com',
  phoneNumber:98765432,
  roleId:{name:'Admin'},
  address:'testAddress',
  customerId:{name:'testCustomerName'},
  createdAt:'2022-10-01T09:02:48.572Z'
}];

describe('UserService', () => {
  let httpUserService: UserService;
  let httpTestingController: HttpTestingController;
  let userBaseUrl = environment.BASE_URL_USERS;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      CookieModule.withOptions(),
      // RouterTestingModule,
      HttpClientTestingModule,
    ],});
    httpUserService = TestBed.inject(UserService);
    httpTestingController=TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(httpUserService).toBeTruthy();
  });

  it("should read users correctly on calling the getUsers function", fakeAsync(() => {
    // let parameter = 'filter={"include":["customer","Role"]}';
    httpUserService.getEmployee().subscribe((users) => {
      
      expect(JSON.stringify(users)).toEqual(JSON.stringify(mockUser));

    });
    let req = httpTestingController.expectOne(userBaseUrl);
    expect(req.request.method).toEqual("GET");
    req.flush(mockUser)
  }));

  it("should delete user correctly on calling the deleteUser function", fakeAsync(() => {
   
    httpUserService.deleteEmployee('uid1').subscribe(() => {});
    let req = httpTestingController.expectOne(userBaseUrl+`/uid1`)
    expect(req.request.method).toEqual("DELETE");
  }));

  it("should post user correctly on calling the postUser function", fakeAsync(() => {
  
    httpUserService.postEmployee(mockUser[0]).subscribe(user => {
      expect(JSON.stringify(user)).toEqual(JSON.stringify(mockUser[0]))
    });
    let req = httpTestingController.expectOne(userBaseUrl)
    expect(req.request.method).toEqual("POST");
    req.flush(mockUser[0])
  }));


});
