import { CustomerService } from './../../services/customer.service';
import { RoleService } from './../../services/role.service';
import { UserService } from './../../services/user.service';
import { RoleModel } from './../../models/role-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  role: RoleModel[];
  addUserForm: FormGroup;
  customers: CustomerModel[];
  constructor(
    private userService: UserService,
    private router: Router,
    private customerService: CustomerService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe((newData) => {
      this.customers = newData;
    });
    this.roleService.getRole().subscribe((newData) => {
      this.role = newData;
    });
    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      middleName: new FormControl(''),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      customerId: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    console.log(this.addUserForm.value);
    this.userService.postEmployee(this.addUserForm.value).subscribe(
      (response: any) => {
        console.log(response);
        alert(`\n New User created Successfully! Log in Now`);
        this.router.navigateByUrl('/');
      },
      (error) => {
        alert('User name alreadt Exists or Internal Server Error');
      }
    );
  }
  display(item: any) {
    if (Number.isInteger(item.value)) return true;
    else return false;
  }
}
