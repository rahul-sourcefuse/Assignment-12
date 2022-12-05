import {inject, service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {
  authenticate,
  AuthenticationBindings,
  STRATEGY,
} from 'loopback4-authentication';
import {User} from '../models';
import {UserRepository} from '../repositories';
import { authorize } from 'loopback4-authorization';
import { permission } from '../permission';

import {BcryptHasher} from '../services/hash.password.bcrypt';
import {jwtService} from '../services/jwt.service';

const CredentialSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const LoginRequestBody = {
  description: 'Login Endpoint inputs',
  required: true,
  content: {
    'application/json': {
      schema: CredentialSchema,
    },
  },
};

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(jwtService)
    public jwtService: jwtService,
    @inject('hash.password.bcrypt')
    public hasher: BcryptHasher,
  ) {}

  @authenticate(STRATEGY.LOCAL)
  @authorize({permissions: ['*']})
  @post('/users/login', {
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(LoginRequestBody)
    credentials: {
      username: 'string';
      password: 'string';
    },
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: User,
  ): Promise<{token: string}> {
    console.log('credentials', credentials);
    console.log('logged in user', currentUser);
    const user: UserProfile = {
      [securityId]: currentUser.id!.toString(),
      id: currentUser.id,
      username: currentUser.username,
      firstname: currentUser.firstName,
    };
    const token = await this.jwtService.generateToken(user);
    return {token};
  }

  @authorize({permissions: ['*']})
  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    user.password = await this.hasher.hashPassword(user.password!);
    return this.userRepository.create(user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.getUserCount]})
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.getUsers]})
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find({include: ['customer', 'role']});
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.updateAllUsers]})
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.getUser]})
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.updateUser]})
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    user.updatedAt = new Date();
    await this.userRepository.updateById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.replaceUser]})
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [permission.deleteUser]})
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
