import { createStubInstance, expect, sinon, StubbedInstanceWithSinonAccessor } from "@loopback/testlab";
import { CustomerController } from "../../controllers";
import { Customer } from "../../models";
import { CustomerRepository } from "../../repositories";

describe('CustomerController (unit)', () => {
    let repository: StubbedInstanceWithSinonAccessor<CustomerRepository>;
    beforeEach(givenStubbedRepository);

    const mockCustomers = [
        new Customer({
          id:'uuid11',
          name:'Rahul',
          website:'www.rahul.com',
          address:'Australia',
          createdAt: new Date('1996-10-13T04:16:36.382Z')
        }),
    ]

    it('fetches all the customer', async () => {
        const controller = new CustomerController(repository);
  
        repository.stubs.find.resolves(mockCustomers);
  
        const customers = await controller.find();
  
        expect(customers).to.deepEqual(mockCustomers);
        sinon.assert.calledWithMatch(repository.stubs.find);
      });
  
      it('deletes the customer with the given id', async () => {
        const controller = new CustomerController(repository);
        await controller.deleteById('uuid11');
        sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid11');
      });
  
      
  
      it('edit selected customer with the given id',async ()=>{
        const controller = new CustomerController(repository);
        const CustomerSelected =new Customer({
          id:'uuid11',
          name:'Rahul',
          website:'www.rahul.com',
          address:'Australia',
          createdAt: new Date('1996-10-13T04:16:36.382Z')
          });
        await controller.updateById('uuid12',CustomerSelected);
        sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid12');
      });
  
      it('adding a new customer',async ()=>{
        const controller = new CustomerController(repository);
        const CustomerSelected =new Customer({
            id:'uuid12',
            name:'John',
            website:'www.John.com',
            address:'Australia',
            createdAt: new Date('1988-09-13T04:16:36.382Z')
          });
        await controller.create(CustomerSelected);
        sinon.assert.calledWithMatch(repository.stubs.create);
      });

    function givenStubbedRepository() {
        repository = createStubInstance(CustomerRepository);
    }
});