import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './entity/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<IUser>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<IUser> {
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

  async remove(id: string): Promise<IUser> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findByIdAndDelete(id, { new: true });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
