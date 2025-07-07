import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.servive';
import { UserDto } from './dto/user.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        notepads: true
      }
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...rest} = profile

    return {
      user: rest
    }
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }

  async update(id: string, dto: UserDto) {
    let data = dto

    if (dto.password) {
      data = {...dto, password: await hash(dto.password)}
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        name: true,
        email: true
      }
    })
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {    
    const uploadDir = path.join(__dirname, '..', '..', 'uploads')

    const filePath = path.join(uploadDir, file.originalname)

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true})
    }

    fs.writeFileSync(filePath, file.buffer)

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        avatar: file.originalname
      }
    })
  }

  async deleteAvatar(id: string) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        avatar: null
      }
    })
  }
}
