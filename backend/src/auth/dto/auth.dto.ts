import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  readonly code: string;
}