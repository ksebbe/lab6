import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ProvidersService } from './providers.service';
import { CreateAndUpdateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly usersService: ProvidersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }


  @Post()
  async create(@Body() createProviderDto: CreateAndUpdateProviderDto) {
    return this.usersService.create(createProviderDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProviderDto: CreateAndUpdateProviderDto) {
    return this.usersService.update(id, updateProviderDto);
  }
}
