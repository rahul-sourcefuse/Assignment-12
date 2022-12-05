import { LoginComponent } from './login/login/login.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { AuthGuard } from './auth.guard';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: EmpDashboardComponent, canActivate: [AuthGuard] },
  // {path:'users/:id',component:EmployeeTableCmomponent},
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomerTableComponent, canActivate: [AuthGuard] },
      {
        path: ':id',
        component: CustomerDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/users' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
