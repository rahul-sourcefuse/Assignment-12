import { EmployeeModel } from './employee-model';

export interface CustomerObject {
  id?: string;
  name: string;
  website: string;
  address: string;
  users?: EmployeeModel[];
  createdAt: string;
}

export class CustomerModel {
  id?: string;
  name: string;
  website: string;
  address: string;
  users?: EmployeeModel[];
  createdAt: string;

  constructor(dataObject: CustomerObject) {
    this.id = dataObject['id'];
    this.name = dataObject['name'];
    this.website = dataObject['website'];
    this.users = dataObject['users'];
    this.createdAt = dataObject['createdAt'];
  }
}
