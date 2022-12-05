export interface EmployeeModel {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  roleId?: { name: string };
  customerId?: { name: string };
  address: string;
  createdAt: string;
}
