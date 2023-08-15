// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// infrastructure

// Application

// Domain
import { Device } from '../../../domain/entities/device.type';
import { DeviceRepository } from '../../../domain/interfaces/device.repository.interface';
import { DomainCreateDeviceDto } from 'src/device/domain/dto/device.create.dto';
import { DomainUpdateDeviceDto } from 'src/device/domain/dto/device.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/domain/interfaces/paginated.result.interface';

@Injectable()
export class DeviceRepositoryImpl implements DeviceRepository {
  constructor(@InjectModel('Device') private readonly model: Model<Device>) {}

  async findAll(): Promise<Device[]> {
    const devices = await this.model.find().lean();
    return devices;
  }

  async findById(id: number): Promise<Device> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Device>> {
    const filters = {
      name: { $regex: pagination.search, $options: 'i' },
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count);
    return { total, data };
  }

  async create(device: DomainCreateDeviceDto): Promise<Device> {
    const created = new this.model(device);
    return await created.save();
  }

  async update(id: number, device: DomainUpdateDeviceDto): Promise<Device> {
    return await this.model.findByIdAndUpdate(id, device, { new: true }).exec();
  }
}
