import { CustomerService } from './../../services/customer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeModel } from './../../models/employee-model';
import { CustomerModel } from './../../models/customer-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  customerData: CustomerModel;
  id: number;
  users: EmployeeModel[];

  constructor(
    private route: ActivatedRoute,
    private customer: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.id = params['id'];
      this.customer
        .getSeletedCustomer(this.id.toString())
        .subscribe((customer) => {
          this.customerData = customer;
          this.users = customer.users;
        });
    });
  }
}
