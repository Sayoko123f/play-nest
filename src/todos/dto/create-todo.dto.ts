import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength, IsOptional, IsIn } from 'class-validator';
import { todoStates, type TodoState } from '../schema/todo.schema';

export class CreateTodoDto {
  @ApiProperty()
  @MaxLength(64)
  title: string;

  @ApiProperty()
  @MaxLength(1024)
  content: string;

  @ApiPropertyOptional({ default: todoStates[0] })
  @IsIn(todoStates)
  @IsOptional()
  state?: TodoState;
}
