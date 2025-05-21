import { Module } from '@nestjs/common';
import { NotepadService } from './notepad.service';
import { NotepadController } from './notepad.controller';
import { PrismaService } from 'src/prisma.servive';

@Module({
  controllers: [NotepadController],
  providers: [NotepadService, PrismaService],
})
export class NotepadModule {}
