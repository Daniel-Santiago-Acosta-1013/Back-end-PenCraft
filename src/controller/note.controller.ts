// src/controller/notes.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from '../services/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../entities/user.entity';

function isValidUUID(uuid: string): boolean {
  const regex =
    /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@GetUser() user: User, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(user, createNoteDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id') id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format.');
    }
    return this.notesService.findOne(user, id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format.');
    }
    return this.notesService.update(user, id, updateNoteDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format.');
    }
    return this.notesService.remove(user, id);
  }
}
