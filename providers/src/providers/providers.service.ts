import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProviders } from './entity/providers.interface';
import { CreateProviderDto } from './dto/create-user.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<IProviders>,
  ) {}

  async findAll(): Promise<IProviders[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateProviderDto): Promise<IProviders> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<IProviders> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findById(id);
  }
}
