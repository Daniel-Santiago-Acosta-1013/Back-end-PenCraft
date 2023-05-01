// src/services/notes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { User } from '../entities/user.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(user: User, createNoteDto: CreateNoteDto): Promise<Note> {
    const note = new Note();
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.user = user;

    return this.noteRepository.save(note);
  }

  async findAll(user: User): Promise<Note[]> {
    return this.noteRepository.find({ where: { user } });
  }

  async findOne(user: User, id: number): Promise<Note> {
    return this.noteRepository.findOneOrFail({ where: { user, id } });
  }

  async update(
    user: User,
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const note = await this.findOne(user, id);
    if (updateNoteDto.title) {
      note.title = updateNoteDto.title;
    }
    if (updateNoteDto.content) {
      note.content = updateNoteDto.content;
    }

    return this.noteRepository.save(note);
  }

  async remove(user: User, id: number): Promise<void> {
    const note = await this.findOne(user, id);
    await this.noteRepository.remove(note);
  }
}
