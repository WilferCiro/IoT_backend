// Nest
import { Injectable } from '@nestjs/common';

// Application
import { DeviceDto } from '../dto/device.dto';

// Domain
import { Device } from 'src/device/domain/entities/device.type';
import { CreateDeviceDto } from '../dto/device.create.dto';
import { UpdateDeviceDto } from '../dto/device.update.dto';
import { DomainCreateDeviceDto } from 'src/device/domain/dto/device.create.dto';
import { DomainUpdateDeviceDto } from 'src/device/domain/dto/device.update.dto';

// Shared

@Injectable()
export class DeviceMapper {
  toDomainCreate(deviceDto: CreateDeviceDto): DomainCreateDeviceDto {
    const { active, name, type } = deviceDto;
    return { active, name, type };
  }

  toDomainUpdate(deviceDto: UpdateDeviceDto): DomainUpdateDeviceDto {
    const { active, name, type } = deviceDto;
    return { active, name, type };
  }

  toDto(device: Device): DeviceDto {
    return device as DeviceDto;
  }
}
