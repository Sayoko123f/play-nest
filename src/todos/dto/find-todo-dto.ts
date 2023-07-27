import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { MaxLength, IsDate, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTodoDto } from './create-todo.dto';
import type { SortValues } from 'mongoose';

export class FindTodoDto extends PickType(CreateTodoDto, ['title'] as const) {
  @ApiPropertyOptional()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createStart: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createEnd: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updateStart: Date;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updateEnd: Date;

  @ApiPropertyOptional({ enum: ['title', 'createdAt', 'upeatedAt'] })
  @IsIn(['title', 'createdAt', 'upeatedAt'])
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  orderBy: SortValues;
}
