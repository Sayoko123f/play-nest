import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    console.log('This action adds a new todo');
    return new this.todoModel(createTodoDto).save();
  }

  findAll() {
    console.log`This action returns all todos`;
    return this.todoModel.find().exec();
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
    return this.todoModel.findByIdAndDelete(id);
  }

  clear() {
    console.log('Clear All Todo!!', new Date().toLocaleTimeString());
    return this.todoModel.deleteMany();
  }
}
