import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserRepository} from '../../repositories';
import {UserController} from '../../controllers';
import {User} from '../../models';
import { jwtService } from '../../services/jwt.service';
import { BcryptHasher } from '../../services/hash.password.bcrypt';

describe('UserController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
  let JwtService: StubbedInstanceWithSinonAccessor<jwtService>;
  let bcryptHasher: StubbedInstanceWithSinonAccessor<BcryptHasher>;
  beforeEach(givenStubbedRepository);
  beforeEach(givenStubbedjwtService);
  beforeEach(givenStubbedBcryptHasher);

  const fetchedUsers = [
    new User({
      id: 'uuid1',
      firstName: 'rahul',
      middleName: 'arora',
      lastName: 'ray',
      address: 'Australia',
      email: 'ray@email.com',
      phoneNumber: 10303010,
      createdAt: new Date('1986-09-13T04:16:36.382Z'),
      roleId: 'dasdsa',
      customerId: 'dsadsa',
      username: 'rahul',
      password: 'rahul@123'
    }),
    new User({
      id: 'uuid2',
      firstName: 'abc',
      middleName: 'bcd',
      lastName: 'def',
      address: 'India',
      email: 'abc@gmail.com',
      phoneNumber: 10303010,
      createdAt: new Date('1987-09-13T04:16:36.382Z'),
      roleId: 'dasdsa',
      customerId: 'dsadsa',
      username: 'ray',
      password: 'ray@123'
    }),
  ];

    it('fetches all the users', async () => {
      const controller = new UserController(repository,JwtService,bcryptHasher);
      repository.stubs.find.resolves(fetchedUsers);

      const users = await controller.find();

      expect(users).to.deepEqual(fetchedUsers);
      sinon.assert.calledWithMatch(repository.stubs.find);
    });

    it('deletes the user with the given id', async () => {
      const controller = new UserController(repository,JwtService,bcryptHasher);
      await controller.deleteById('uuid1');
      sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid1');
    });

    
    it('edit selected user with the given id',async ()=>{
      const controller = new UserController(repository,JwtService,bcryptHasher);
      const userData =new User({
        id: 'uuid1',
      firstName: 'rahul',
      middleName: 'arora',
      lastName: 'ray',
      address: 'Australia',
      email: 'ray@email.com',
      phoneNumber: 10303010,
      createdAt: new Date('1986-09-13T04:16:36.382Z'),
      roleId: 'dasdsa',
      customerId: 'dsadsa',
      username: 'rahul',
      password: 'rahul@123'
      });
      await controller.updateById('uuid1',userData);
      sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid1');
    });

    it('adding a new user',async ()=>{
      const controller = new UserController(repository,JwtService,bcryptHasher);
      const userData =new User({
        firstName: 'rohit',
        middleName: 'kumar',
        lastName: 'rony',
        address: 'Australia',
        email: 'rohit@gmail.com',
        phoneNumber: 10303010,
        createdAt: new Date('1986-09-13T04:16:36.382Z'),
        updatedAt: new Date('1986-09-13T04:16:36.382Z'),
        roleId: 'dasdsa',
        customerId: 'dsadsa',
        username: 'rohit',
        password: 'rohit@123'
      });
      await controller.create(userData);
      sinon.assert.calledWithMatch(repository.stubs.create);
    });


  function givenStubbedRepository() {
    repository = createStubInstance(UserRepository);
  }
  function givenStubbedjwtService() {
    JwtService = createStubInstance(jwtService);
  }
  function givenStubbedBcryptHasher() {
    bcryptHasher = createStubInstance(BcryptHasher);
  }
});
