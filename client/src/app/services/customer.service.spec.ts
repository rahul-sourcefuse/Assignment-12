import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../models/customer-model';

import { CustomerService } from './customer.service';

export const mockCustomer: CustomerModel[] = [{
  id:'uuid3',
  name:'mockCustomerName',
  website:'mockCustomerWebsite',
  address:'mockCustomerAddress',
  createdAt:'mockCustomerCreationDate'
}];
describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      CookieModule.withOptions(),
      RouterTestingModule,
      HttpClientTestingModule,
    ],});
    service = TestBed.inject(CustomerService);
    httpTestingController=TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should read customers correctly on calling the getCustomer function", fakeAsync(() => {  
    // let parameter = 'filter={"include":["users"]}';
    service.getCustomer().subscribe((customers) => {   
      expect(JSON.stringify(customers)).toEqual(JSON.stringify(mockCustomer));
    });
    let req = httpTestingController.expectOne('http://localhost:3000/customers');
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));

  it("should delete customer correctly on calling the deleteCustomer function", fakeAsync(() => {
   
    service.deleteCustomer('uuid3').subscribe(() => {});
    let req = httpTestingController.expectOne('http://localhost:3000/customers'+`/uuid3`)
    expect(req.request.method).toEqual("DELETE");
  }));

  it("should post customer correctly on calling the postCustomer function", fakeAsync(() => {
  
    service.postCustomer(mockCustomer[0]).subscribe(user => {
      expect(JSON.stringify(user)).toEqual(JSON.stringify(mockCustomer[0]))
    });
    let req = httpTestingController.expectOne('http://localhost:3000/customers')
    expect(req.request.method).toEqual("POST");
    req.flush(mockCustomer[0])
  }));

  it("should get Selected Customer correctly on calling the getSelectedCustomer function", fakeAsync(() => {
    // let parameter = 'filter={"include":["users"]}';
    service.getSeletedCustomer('uuid3').subscribe((user) => {
      
      expect(JSON.stringify(user)).toEqual(JSON.stringify([mockCustomer[0]]));

    });
    let req = httpTestingController.expectOne('http://localhost:3000/customers'+'/uuid3');
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));
});
