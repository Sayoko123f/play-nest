import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, FilterQuery, SortOrder } from 'mongoose';
import { Todo } from './schema/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindTodoDto } from './dto/find-todo-dto';
import { fq } from '../utils/filter-query';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    console.log('This action adds a new todo');
    return new this.todoModel(createTodoDto).save();
  }

  findAll(params: FindTodoDto) {
    console.log`This action returns all todos`;

    const filter: FilterQuery<Todo> = { deleted: { $eq: false } };
    const sort: Record<string, SortOrder> = {};
    const skip = params.skip ?? 0;
    const limit = params.limit ?? 0;
    params.title && (filter.title = fq.regex(params.title));
    params.state && (filter.state = fq.in(params.state));

    if (params.createStart || params.createEnd) {
      filter.createdAt = fq.betweenDate({ start: params.createStart, end: params.createEnd });
    }
    if (params.updateStart || params.updateEnd) {
      filter.upeatedAt = fq.betweenDate({ start: params.updateStart, end: params.updateEnd });
    }
    if (params.sortBy) {
      sort[params.sortBy] = params.orderBy ?? 'asc';
    }
    sort.createdAt = params.orderBy ?? 'asc';

    return this.todoModel
      .find(filter, null, {
        sort,
        skip,
        limit,
      })
      .exec();
  }

  findOne(id: string) {
    console.log`This action returns a #${id} todo`;
    return this.todoModel.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    console.log`This action updates a #${id} todo`;
    return this.todoModel.findByIdAndUpdate(id, { $set: updateTodoDto }, { new: true });
  }

  remove(id: string) {
    console.log`This action removes a #${id} todo`;
    return this.todoModel.findByIdAndUpdate(id, { $set: { deleted: true } });
  }

  clear() {
    console.log('Clear All Todo!!', new Date().toLocaleTimeString());
    return this.todoModel.deleteMany();
  }
}
