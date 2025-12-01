import { Body, Controller, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar'))
  @Auth()
  @Post()
  async uploadFile(@CurrentUser() user, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({
        fileType: /\/(jpg|jpeg|png|webp)$/
      }),
      new MaxFileSizeValidator({
        maxSize: 1000 * 1000 * 5,
        message: 'Можно загружать файлы не более 5 МБ'
      })
    ]
  })) file: Express.Multer.File) {
    return this.userService.uploadAvatar(user, file)
  }

  @HttpCode(200)
  @Put('delete')
  @Auth()
  async deleteFile(@CurrentUser() user) {
    return this.userService.deleteAvatar(user);
  }
}
