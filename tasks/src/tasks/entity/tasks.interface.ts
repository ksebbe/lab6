import { Document } from 'mongoose';

export interface ITask extends Document {
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly priority: number;
  assignedUserId: string;
  assignedProvider: string;
}
