import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,

} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  status: string;

  @IsNumber()
  @IsPositive()
  priority: number;

  @IsString()
  assignedUserId?: string;

  @IsString()
  assignedProvider?: string;
}
