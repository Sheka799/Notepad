import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.servive';

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
}
