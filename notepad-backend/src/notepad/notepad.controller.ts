import { Controller, Get, Post, Body, Param, Delete, HttpCode, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { NotepadService } from './notepad.service';
import { NotepadDto } from './dto/notepad.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user/notepads')
export class NotepadController {
  constructor(private readonly notepadService: NotepadService) {}

  @Get()
  @Auth()
  async findAll(@CurrentUser('id') userId: string) {
    return this.notepadService.findAll(userId);
  }

  @Get(':id')
  @Auth()
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.notepadService.findOne(id, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: NotepadDto, @CurrentUser('id') userId: string) {
    return this.notepadService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Body() dto: NotepadDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.notepadService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.notepadService.delete(id);
  }
}
