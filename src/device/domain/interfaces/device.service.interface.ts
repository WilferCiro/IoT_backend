// Nest

// Domain
import { DomainCreateDeviceDto } from '../dto/device.create.dto';
import { DomainUpdateDeviceDto } from '../dto/device.update.dto';
import { Device } from '../entities/device.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/domain/interfaces/paginated.result.interface';

export interface DeviceService {
  findById(id: number): Promise<Device>;
  findAll(): Promise<Device[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Device>>;
  create(device: DomainCreateDeviceDto): Promise<Device>;
  update(id: number, device: DomainUpdateDeviceDto): Promise<Device>;
}
