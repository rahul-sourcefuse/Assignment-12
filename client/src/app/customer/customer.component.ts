import { RoleModel } from './../models/role-model';
import { CustomerModel } from './../models/customer-model';
import { CustomerService } from './../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employee-model';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  row: HTMLTableRowElement;
  formValue!: FormGroup;
  customerModelObj: CustomerModel;
  customerData!: any;
  roleList: RoleModel[];
  rowId: string;
  updatedData: CustomerModel;
  customerList: CustomerModel[];
  users: EmployeeModel[] | undefined;
  id: number;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private customer: CustomerService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      website: [''],
      address: [''],
    });
    this.getAllCustomer();

    // this.customer.getSeletedCustomer().subscribe(data => {
    //   this.customerList = data;
    // });
    // this.role.getRole().subscribe(data => {
    //   this.roleList = data;
    // });
  }

  getAllCustomer() {
    this.customer.getCustomer().subscribe((res) => {
      console.log(res);
      this.customerData = res;
    });
  }
  clickAddCustomer() {
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
      // let roleid: RoleModel;
      // this.role.getRole().subscribe(response => {
      //   response.map(data => {
      //     console.log(data);
      //     if (data.name == this.formValue.value.roleId) {
      //       roleid = data.id;
      //     }
      //   })
      let userFormData = this.formValue.value;
      //   // userFormData['roleId']=roleid;
      console.log(userFormData);
      this.customer.postCustomer(userFormData).subscribe(
        (res) => {
          alert('Customer added Successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllCustomer();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  updateCustomerDetails() {
    this.updatedData.name = this.formValue.value.name;
    this.updatedData.website = this.formValue.value.website;
    this.updatedData.address = this.formValue.value.address;
    this.customer
      .updateCustomer(this.updatedData, this.rowId)
      .subscribe((res) => {
        alert('Update Successfully');
        this.getAllCustomer();
      });
  }
}
