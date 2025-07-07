import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NotepadModule } from './notepad/notepad.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, NotepadModule, ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '..', 'uploads'),
    serveRoot: '/static'
  })]
})
export class AppModule {}
