import { RoleService } from './../services/role.service';
import { RoleModel } from './../models/role-model';
import { CustomerModel } from './../models/customer-model';
import { CustomerService } from './../services/customer.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employee-model';
import * as moment from 'moment';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  formValue: FormGroup;
  employeeModelObj: EmployeeModel;
  employeeData!: any;
  roleList: RoleModel[];
  rowId: string;
  updatedData: EmployeeModel;
  customerList: CustomerModel[];
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(
    private formbuilder: FormBuilder,
    private user: UserService,
    private customer: CustomerService,
    private role: RoleService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      roleId: [''],
      customerId: [''],
    });
    this.getAllEmployee();
    this.customer.getCustomer().subscribe((data) => {
      this.customerList = data;
      console.log(this.customerList);
    });
    this.role.getRole().subscribe((data) => {
      this.roleList = data;
    });
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmit(): void {
    if (this.formValue.status === 'INVALID') {
      this.showAdd = true;
      return;
    } else {
      this.showAdd = false;
      let roleid: RoleModel;
      this.role.getRole().subscribe((response) => {
        response.map((data) => {
          console.log(data);
          if (data.name == this.formValue.value.roleId) {
            roleid = data.id;
          }
        });
        let userFormData = this.formValue.value;
        // userFormData['roleId']=roleid;
        console.log(userFormData);
        this.user.postEmployee(userFormData).subscribe(
          (res) => {
            alert('Employee added Successfully');
            let ref = document.getElementById('cancel');
            ref?.click();
            this.formValue.reset();
            this.getAllEmployee();
          },
          (err) => {
            console.log(err);
            alert(err);
          }
        );
      });
    }
  }

  getAllEmployee() {
    this.user.getEmployee().subscribe((res) => {
      console.log(res);
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.user.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee Deleted Successfully');
      this.getAllEmployee();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.rowId = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['middleName'].setValue(row.middleName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['roleId'].setValue(row.roleId);
    this.formValue.controls['customerId'].setValue(row.customerId);
    this.updatedData = this.formValue.value;
  }

  updateEmployeeDetails() {
    this.updatedData.firstName = this.formValue.value.firstName;
    this.updatedData.middleName = this.formValue.value.middleName;
    this.updatedData.lastName = this.formValue.value.lastName;
    this.updatedData.email = this.formValue.value.email;
    let num = this.formValue.value.phoneNumber;
    this.updatedData.phoneNumber = +num;
    this.updatedData.address = this.formValue.value.address;
    this.updatedData.roleId = this.formValue.value.roleId;
    this.updatedData.customerId = this.formValue.value.customerId;
    this.user.updateEmployee(this.updatedData, this.rowId).subscribe((res) => {
      alert('Update Successfully');
      this.getAllEmployee();
    });
  }
}
