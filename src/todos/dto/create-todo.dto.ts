import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @MaxLength(64)
  title: string;

  @ApiProperty()
  @MaxLength(1024)
  content: string;
}
