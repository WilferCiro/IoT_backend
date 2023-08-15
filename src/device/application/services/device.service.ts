// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Device } from 'src/device/domain/entities/device.type';
import { DeviceRepository } from 'src/device/domain/interfaces/device.repository.interface';
import { DeviceService } from 'src/device/domain/interfaces/device.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateDeviceDto } from 'src/device/domain/dto/device.create.dto';
import { DomainUpdateDeviceDto } from 'src/device/domain/dto/device.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/domain/interfaces/paginated.result.interface';

@Injectable()
export class DeviceServiceImpl implements DeviceService {
  constructor(
    @Inject('DeviceRepository')
    private readonly repository: DeviceRepository,
  ) {}

  async findAll(): Promise<Device[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Device> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Device>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(device: DomainCreateDeviceDto): Promise<Device> {
    return await this.repository.create(device);
  }

  async update(id: number, device: DomainUpdateDeviceDto): Promise<Device> {
    return await this.repository.update(id, device);
  }
}
