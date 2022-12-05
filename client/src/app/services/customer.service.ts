import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { CustomerModel } from './../models/customer-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerBaseUrl = environment.BASE_URL_CUSTOMERS;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  getCustomer() {
    const cookieUserId = this.cookieService.get('id');
    return this.http
      .get<CustomerModel[]>(this.customerBaseUrl, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postCustomer(data: CustomerModel) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required !`);
      this.router.navigateByUrl('');
    }
    return this.http
      .post<CustomerModel>(environment.BASE_URL_CUSTOMERS, data, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteCustomer(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required !`);
      this.router.navigateByUrl('');
    }
    return this.http
      .delete<CustomerModel>('http://localhost:3000/customers/' + id, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateCustomer(data: CustomerModel, id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required !`);
      this.router.navigateByUrl('');
    }
    return this.http
      .put<CustomerModel>('http://localhost:3000/customers/' + id, data, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getSeletedCustomer(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required !`);
      this.router.navigateByUrl('');
    }
    return this.http
      .get<any>('http://localhost:3000/customers/' + id, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }
}
