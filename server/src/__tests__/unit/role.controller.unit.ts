import { createStubInstance, expect, sinon, StubbedInstanceWithSinonAccessor } from "@loopback/testlab";
import { RoleController } from "../../controllers";
import { Role } from "../../models";
import { RoleRepository } from "../../repositories";

describe('RoleController (unit)', () => {
    let repository: StubbedInstanceWithSinonAccessor<RoleRepository>;
    beforeEach(givenStubbedRepository);

    const fetchedRoles = [
        new Role({
          id:'uuid10',
          name:'Admin',
          description:'Administrative rights',
          permissions:["getUserCount", "getUsers", "getUser", "updateUser", "replaceUser", "deleteUser", "getCustomersCount", "getCustomers", "getCustomer", "updateCustomer", "getRolesCount", "getRoles", "getCustomerUsers", "createCustomerUser", "updateCustomerUser", "getRoleUsers", "createRoleUser", "updateRoleUser", "getUserCustomer", "getUserRole"]
        }),
    ]
    it('fetches all the roles', async () => {
        const controller = new RoleController(repository);
  
        repository.stubs.find.resolves(fetchedRoles);
  
        const roles = await controller.find();
  
        expect(roles).to.deepEqual(fetchedRoles);
        sinon.assert.calledWithMatch(repository.stubs.find);
      });
  
      it('deletes the role with the given roleid', async () => {
        const controller = new RoleController(repository);
        await controller.deleteById('uuid10');
        sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid10');
      });
  
     
      it('edit selected role with the given id',async ()=>{
        const controller = new RoleController(repository);
        const roleSelected =new Role({
            id:'uuid10',
            name:'Admin',
            description:'Administrative role',
            permissions:["getUserCount", "getUsers", "getUser", "updateUser", "replaceUser", "deleteUser", "getCustomersCount", "getCustomers", "getCustomer", "updateCustomer", "getRolesCount", "getRoles", "getCustomerUsers", "createCustomerUser", "updateCustomerUser", "getRoleUsers", "createRoleUser", "updateRoleUser", "getUserCustomer", "getUserRole"]
          })
        await controller.updateById('uuid10',roleSelected);
        sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid10');
      });
  
      it('adding a new role',async ()=>{
        const controller = new RoleController(repository);
        const roleData =new Role({
            name:'Subscriber',
            description:'Resource Access',
            permissions:["getUserCount", "getUsers", "getUser", "getCustomers", "getCustomersCount", "getCustomer", "getRolesCount", "getRoles", "getCustomerUsers", "getRoleUsers", "getUserCustomer", "getUserRole"]
          })
        await controller.create(roleData);
        sinon.assert.calledWithMatch(repository.stubs.create);
      });

    function givenStubbedRepository() {
        repository = createStubInstance(RoleRepository);
    }
});