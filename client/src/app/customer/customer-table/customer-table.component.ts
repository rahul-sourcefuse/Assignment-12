import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { EmployeeModel } from 'src/app/models/employee-model';
import { RoleModel } from 'src/app/models/role-model';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent implements OnInit {
  @Output() updatedData = new EventEmitter();
  // @Output () onEdit = new EventEmitter();
  // @Input() getAllCustomer;
  @Input() formValue;
  @Input() showAdd: boolean;
  @Input() showUpdate: boolean;

  // @Input() showAdd!:boolean|boolean;
  // @Input() showUpdate!:boolean|boolean;
  @Input() customerData;
  // @Input() updateCustomerDetails;
  // @Input() updatedData;

  // formValue!: FormGroup;
  customerModelObj: CustomerModel;
  // customerData!: any;
  // updatedData: CustomerModel;
  rowId: string;

  users: EmployeeModel[] | undefined;
  id: number;
  // showAdd!: boolean
  // showUpdate!: boolean;
  // formbuilder: any;

  constructor(private customer: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomer();
    console.log(this.showUpdate);
    console.log(this.showAdd);
    // console.log(this.formValue)
    // console.log(this.updatedData);
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    console.log(this.showUpdate);

    this.rowId = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['website'].setValue(row.website);
    this.formValue.controls['address'].setValue(row.address);
    // this.showUpdate=true;
    this.updatedData = this.formValue.value;
  }

  deleteCustomer(row: any) {
    this.customer.deleteCustomer(row.id).subscribe((res) => {
      alert('Customer Deleted Successfully');
      this.getAllCustomer();
    });
  }
  getAllCustomer() {
    this.customer.getCustomer().subscribe((res) => {
      console.log(res);
      this.customerData = res;
    });
  }
}
