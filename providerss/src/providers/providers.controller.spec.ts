import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

import { ProviderSchema } from './entity/providers.schema';
import { IProviders } from './entity/providers.interface';

import { getMongodbConfig } from '../config/mongodb.config';

let testProvider: IProviders;

describe('ProvidersController', () => {
  let providersController: ProvidersController;
  let providersService: ProvidersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [ProvidersService],
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getMongodbConfig,
        }),
        MongooseModule.forFeature([
          {
            name: 'Providers',
            schema: ProviderSchema,
          },
        ]),
      ],
    }).compile();

    providersController = app.get<ProvidersController>(ProvidersController);
    providersService = app.get<ProvidersService>(ProvidersService);

    testProvider = await providersService.create({ name: 'Test' });
  });

  describe('root', () => {
    it('should create new provider', async () => {
      const provider = { name: 'Github' };
      const createdProvider = await providersController.create(provider);

      expect(createdProvider.name).toBe(provider.name);

      await providersService.delete(createdProvider._id);
    });

    it('should get all providers', async () => {
      const providers = await providersController.findAll();
      const isTestProviderExists = providers
        .some((provider) => provider._id.toString() === testProvider._id.toString());

      expect(isTestProviderExists).toBeTruthy();
    });

    it('should find provider by id', async () => {
      const provider = await providersController.findOne(testProvider._id);

      expect(provider).toBeTruthy();
    });

    it('should update provider', async () => {
      const provider = { name: 'Github' };
      const updatedProvider = await providersController.update(testProvider._id, provider);

      expect(updatedProvider.name).toBe(provider.name);
    });
  });

  afterAll(async () => {
    await providersService.delete(testProvider._id);
  });
})