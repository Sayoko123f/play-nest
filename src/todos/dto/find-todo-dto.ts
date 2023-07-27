import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { MaxLength, Min, Max, IsDate, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { todoStates, type TodoState } from '../schema/todo.schema';
import type { SortValues } from 'mongoose';

export class FindTodoDto {
  @ApiPropertyOptional()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ isArray: true, enum: todoStates })
  @IsIn(todoStates, { each: true })
  @IsOptional()
  state?: TodoState[];

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createStart?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createEnd?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updateStart?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updateEnd?: Date;

  @ApiPropertyOptional({ enum: ['title', 'createdAt', 'upeatedAt'] })
  @IsIn(['title', 'createdAt', 'upeatedAt'])
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  orderBy?: SortValues;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
