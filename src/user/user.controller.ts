import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {

  constructor(private repo: UserRepository) {}

  @Get()
  async findAll() {
    const users = this.repo.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.repo.findOne(+id);
    return user;
  }

  @Post()
  async create(@Body() user: User) {
    const newUser = await this.repo.create(user);
    return newUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    const updatedUser = await this.repo.update({
      ...user,
      id: +id
    })

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.repo.delete(+id); 
  }

}
