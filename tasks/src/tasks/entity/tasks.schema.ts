import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { now } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'new' })
  status: string;

  @Prop({ default: 0 })
  priority: number;

  @Prop()
  assignedUserId?: string | null;

  @Prop()
  assignedProvider?: string | null;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
