export class RoleModel {
  id?: string;
  name: string ;
}

export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}
