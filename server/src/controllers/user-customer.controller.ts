import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';

import { authenticate, STRATEGY } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';
import { permission } from '../permission';

import {User, Customer} from '../models';
import {UserRepository} from '../repositories';

export class UserCustomerController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}
  
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.getUserCustomer]})
  @get('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Customer> {
    return this.userRepository.customer(id);
  }
}
