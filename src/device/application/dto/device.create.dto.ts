import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  active: boolean;
}
