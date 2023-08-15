import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDeviceDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
