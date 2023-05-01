import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { NotesService } from '../services/note.service';
import { NotesController } from '../controller/note.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}