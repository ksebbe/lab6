import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }



  @Post(':id/assign')
  async assignTask(@Param('id') id: string, @Body('userId') userId: string) {
    return this.tasksService.assignTask(id, userId);
  }

  @Post(':id/provider')
  async assignProvider(@Param('id') id: string, @Body('providerId') providerId: string) {
    return this.tasksService.assignProvider(id, providerId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
