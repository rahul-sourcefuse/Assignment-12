import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { EmployeeModel } from './../models/employee-model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userBaseUrl = environment.BASE_URL_USERS;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }) {
    const credentialsToSend = {
      username: credentials.username,
      password: credentials.password,
    };
    return this.http.post(`${this.userBaseUrl}/login`, credentialsToSend);
  }

  postEmployee(data: EmployeeModel) {
    const cookieUserId = this.cookieService.get('id');
    return this.http
      .post<any>(this.userBaseUrl, data, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEmployee() {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required !');
      this.router.navigateByUrl('');
    }
    return this.http
      .get<any>(this.userBaseUrl , {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateEmployee(data: EmployeeModel, id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required!`);
      this.router.navigateByUrl('');
    }
    return this.http
      .put<any>(`${this.userBaseUrl}/${id}`, data, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteEmployee(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert(`Login Required!`);
      this.router.navigateByUrl('');
    }
    return this.http
      .delete<any>(`${this.userBaseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${cookieUserId}` },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
