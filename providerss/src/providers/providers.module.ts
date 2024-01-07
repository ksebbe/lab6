import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderSchema } from './entity/providers.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Providers',
        schema: ProviderSchema,
      },
    ]),
  ],
  providers: [ProvidersService],
  controllers: [ProvidersController]
})
export class ProvidersModule {}
