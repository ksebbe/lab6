import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { now } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: 'developer' })
  role: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
