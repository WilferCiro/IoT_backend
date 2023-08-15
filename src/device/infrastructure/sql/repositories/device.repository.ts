import { BadRequestException, Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../../domain/interfaces/device.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/domain/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { DeviceEntity } from '../entities/device.entity';
import { Device } from 'src/device/domain/entities/device.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateDeviceDto } from 'src/device/domain/dto/device.update.dto';
import { DomainCreateDeviceDto } from 'src/device/domain/dto/device.create.dto';

@Injectable()
export class DeviceRepositoryImpl implements DeviceRepository {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly repository: Repository<DeviceEntity>,
  ) {}

  async findAll(): Promise<Device[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<Device> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Device>> {
    const filters = {
      where: [{ name: ILike(`%${pagination.search}%`) }],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(device: DomainCreateDeviceDto): Promise<Device> {
    const exists = false; // TODO: check if exists
    if (exists) {
      throw new BadRequestException(`El registro ya existe`);
    }
    return await this.repository.save(device);
  }

  async update(id: number, device: DomainUpdateDeviceDto): Promise<Device> {
    return await this.repository.save({ id, ...device });
  }
}
