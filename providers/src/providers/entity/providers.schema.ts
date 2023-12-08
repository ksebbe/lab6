import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Provider {
  @Prop()
  name: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
