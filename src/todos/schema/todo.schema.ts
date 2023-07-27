import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

export const todoStates = ['Pending', 'Progress', 'Resolved'] as const;
export type TodoState = (typeof todoStates)[number];

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ enum: todoStates, type: String, default: todoStates[0] })
  state: TodoState;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
