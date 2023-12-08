import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAndUpdateProviderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
