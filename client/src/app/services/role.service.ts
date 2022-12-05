import { RoleModel } from './../models/role-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRole() {
    return this.http.get<RoleModel[]>('http://localhost:3000/roles').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
