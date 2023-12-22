import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
export declare const getMongodbConfig: (configService: ConfigService) => Promise<MongooseModuleOptions>;
