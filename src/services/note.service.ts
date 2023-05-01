// src/services/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(user: User, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { user, id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    return note;
  }

  async update(
    user: User,
    id: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { user, id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    if (updateNoteDto.title) {
      note.title = updateNoteDto.title;
    }
    if (updateNoteDto.content) {
      note.content = updateNoteDto.content;
    }
    return this.noteRepository.save(note);
  }

  async remove(user: User, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { user, id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    await this.noteRepository.remove(note);
    return note;
  }
}
