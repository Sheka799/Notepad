import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NotepadModule } from './notepad/notepad.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StorageModule } from './storage/storage.module';
import * as path from 'path'

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, NotepadModule, StorageModule, ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '..', 'uploads'),
    serveRoot: '/static'
  })]
})
export class AppModule {}
