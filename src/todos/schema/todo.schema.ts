import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
