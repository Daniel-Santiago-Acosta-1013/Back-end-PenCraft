import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { NotesModule } from './modules/note.module';
import ormconfig from './config/ORMconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, NotesModule],
})

export class AppModule {}
