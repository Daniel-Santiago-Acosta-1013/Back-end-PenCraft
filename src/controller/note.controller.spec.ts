import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './note.controller';
import { NotesService } from '../services/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { User } from '../entities/user.entity';
import { Note } from '../entities/note.entity';

describe('NotesController', () => {
  let notesController: NotesController;
  let notesService: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    notesController = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(notesController).toBeDefined();
  });

  it('should create a new note', async () => {
    const createNoteDto: CreateNoteDto = {
      title: 'Test Note',
      content: 'Test content',
    };
    const result = new Note();
    result.id = '1';
    result.title = createNoteDto.title;
    result.content = createNoteDto.content;

    jest.spyOn(notesService, 'create').mockResolvedValue(result);

    const user = new User();
    expect(await notesController.create(user, createNoteDto)).toBe(result);
  });

  it('should return an array of notes', async () => {
    const note = new Note();
    note.title = 'Test Note';
    note.content = 'Test content';
    const result = [note];
    jest.spyOn(notesService, 'findAll').mockResolvedValue(result);

    const user = new User();
    expect(await notesController.findAll(user)).toBe(result);
  });

  it('should return a single note', async () => {
    const note = new Note();
    note.id = '1';
    note.title = 'Test Note';
    note.content = 'Test content';

    jest.spyOn(notesService, 'findOne').mockResolvedValue(note);

    const user = new User();
    const id = '1';
    expect(await notesController.findOne(user, id)).toBe(note);
  });

  it('should update a note', async () => {
    const updateNoteDto: UpdateNoteDto = {
      title: 'Updated Note',
      content: 'Updated content',
    };
    const updatedNote = new Note();
    updatedNote.id = '1';
    updatedNote.title = updateNoteDto.title;
    updatedNote.content = updateNoteDto.content;

    jest.spyOn(notesService, 'update').mockResolvedValue(updatedNote);

    const user = new User();
    const id = '1';
    expect(await notesController.update(user, id, updateNoteDto)).toBe(
      updatedNote,
    );
  });

  it('should remove a note', async () => {
    const note = new Note();
    note.id = '1';
    note.title = 'Test Note';
    note.content = 'Test content';

    jest.spyOn(notesService, 'remove').mockResolvedValue(note);

    const user = new User();
    const id = '1';
    expect(await notesController.remove(user, id)).toBe(note);
  });
});
