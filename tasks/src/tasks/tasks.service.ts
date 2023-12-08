import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from './entity/tasks.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import axios from 'axios';
import * as process from 'process';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<ITask>,
  ) {}

  async createTask(task: CreateTaskDto): Promise<ITask> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async findAll(): Promise<ITask[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<ITask> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const task = this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async assignTask(id: string, userId: string): Promise<ITask> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    try {
      await axios.get(`${process.env.USERS_SERVICE_URL}/users/${userId}`);

      task.assignedUserId = userId;
    } catch (error) {
      throw new NotFoundException('User not found');
    }

    return task.save();
  }

  async assignProvider(id: string, providerId: string): Promise<ITask> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new NotFoundException('Invalid id');
    }

    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    try {
      const provider = await axios.get(`${process.env.PROVIDERS_SERVICE_URL}/providers/${providerId}`);

      task.assignedProvider = provider.data.name;
    } catch (error) {
      throw new NotFoundException('Provider not found');
    }

    return task.save();
  }

  async delete(id: string): Promise<ITask> {
    return this.taskModel.findByIdAndDelete(id, { new: true });
  }
}
