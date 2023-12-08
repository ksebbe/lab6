import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { UserSchema } from './entity/users.schema';
import { IUser } from './entity/users.interface';

import { getMongodbConfig } from '../config/mongodb.config';

let testUser: IUser;

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getMongodbConfig,
        }),
        MongooseModule.forFeature([
          {
            name: 'Users',
            schema: UserSchema,
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    testUser = await controller.create({ firstName: 'Test', lastName: 'Test', role: 'Test' });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('base operations', () => {
    it('should create user', () => {
      expect(testUser).toBeDefined();
      expect(testUser.firstName).toEqual('Test');
      expect(testUser.lastName).toEqual('Test');
      expect(testUser.role).toEqual('Test');
    });

    it('should get user', async () => {
      const user = await controller.findOne(testUser._id);

      expect(user).toBeDefined();
      expect(user.firstName).toEqual('Test');
      expect(user.lastName).toEqual('Test');
      expect(user.role).toEqual('Test');
    });

    it('should update user', async () => {
      const user = await controller.update(testUser._id, { firstName: 'Test2', lastName: 'Test2', role: 'Test2' });

      expect(user).toBeDefined();
      expect(user.firstName).toEqual('Test2');
      expect(user.lastName).toEqual('Test2');
      expect(user.role).toEqual('Test2');
    });

    it('should find all users', async () => {
      const users = await controller.findAll();

      expect(users).toBeDefined();
    });
  });

  afterAll(async () => {
    await controller.remove(testUser._id);
  });
});
