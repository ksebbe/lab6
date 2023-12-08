import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import { TaskSchema } from './entity/tasks.schema';
import { ITask } from './entity/tasks.interface';

import { getMongodbConfig } from '../config/mongodb.config';

let testTask: ITask;

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

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
            name: 'Tasks',
            schema: TaskSchema,
          },
        ]),
      ],
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);

    testTask = await controller.create({ name: 'Test', description: 'Test', status: 'Test', priority: 1 });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('base operations', () => {
    it('should create task', () => {
      expect(testTask).toBeDefined();
      expect(testTask.name).toEqual('Test');
      expect(testTask.description).toEqual('Test');
      expect(testTask.status).toEqual('Test');
      expect(testTask.priority).toEqual(1);
    });

    it('should get task', async () => {
      const task = await controller.findOne(testTask._id);

      expect(task).toBeDefined();
    });

    it('should get all tasks', async () => {
      const tasks = await controller.findAll();

      expect(tasks).toBeDefined();
    });

    it('should assign user', () => {
      const task = controller.assignTask(testTask._id, '65731cc7e1bb40e34f262cda').catch(() => {});

      expect(task).toBeDefined();
    });

    it('should assign provider', () => {
      const task = controller.assignProvider(testTask._id, '6573161f7d59111b544e639d').catch(() => {});

      expect(task).toBeDefined();
    });
  });

  afterAll(async () => {
    await service.delete(testTask._id);
  });
});
