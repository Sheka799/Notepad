import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NotepadModule } from './notepad/notepad.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, NotepadModule, StorageModule]
})
export class AppModule {}
