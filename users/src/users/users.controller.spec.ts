import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { UserSchema } from './entity/users.schema';
import { IUser } from './entity/users.interface';

import { getMongodbConfig } from '../config/mongodb.config';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;
  let testUser: IUser;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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

    testUser = await controller.create({ firstName: 'Test', lastName: 'Test', role: 'Test' });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', (done) => {
    expect(testUser).toBeDefined();
    done();
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

  it('should delete user', async () => {
    const user = await controller.remove(testUser._id);

    expect(user).toBeDefined();
  });

  afterEach(() => {
    return controller.remove(testUser._id);
  });

  afterAll(() => {
    return module.close();
  });
});
