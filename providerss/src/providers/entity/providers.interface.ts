import { Document } from 'mongoose';

export interface IProviders extends Document {
  readonly name: string;
}
