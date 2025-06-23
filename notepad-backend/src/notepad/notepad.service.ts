import { Injectable } from '@nestjs/common';
import { NotepadDto } from './dto/notepad.dto';
import { PrismaService } from 'src/prisma.servive';

@Injectable()
export class NotepadService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.notepad.findMany({
      where: {
        userId
      }
    })
  }

  async findOne(notepadId: string, userId: string) {
    return this.prisma.notepad.findUnique({
      where: {
        userId,
        id: notepadId
      }
    })
  }

  async create(dto: NotepadDto, userId: string) {
    return this.prisma.notepad.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async update(dto: Partial<NotepadDto>, notepadId: string, userId: string) {
    return this.prisma.notepad.update({
      where: {
        userId,
        id: notepadId
      },
      data: dto
    })
  }

  async delete(notepadId: string) {
    return this.prisma.notepad.delete({
      where: {
        id: notepadId
      }
    })
  }
}
