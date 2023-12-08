import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { IProviders } from './entity/providers.interface';
import { CreateAndUpdateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('Providers') private readonly providersModel: Model<IProviders>,
  ) {}

  async findAll(): Promise<IProviders[]> {
    return this.providersModel.find().exec();
  }

  async create(createProviderDto: CreateAndUpdateProviderDto): Promise<IProviders> {
    const createdProvider = new this.providersModel(createProviderDto);
    return createdProvider.save();
  }

  async update(id: string, updateProviderDto: CreateAndUpdateProviderDto): Promise<IProviders> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const provider = await this.providersModel.findById(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.providersModel.findByIdAndUpdate(id, updateProviderDto, { new: true });
  }

  async delete(id: string): Promise<IProviders> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const provider = await this.providersModel.findById(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.providersModel.findByIdAndDelete(id, { new: true });
  }

  async findOne(id: string): Promise<IProviders> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const provider = this.providersModel.findById(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.providersModel.findById(id);
  }
}
