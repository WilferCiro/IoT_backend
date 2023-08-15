// Nest
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

// Application
import { DeviceMapper } from '../../application/mapper/device.mapper';
import { CreateDeviceDto } from '../../application/dto/device.create.dto';
import { UpdateDeviceDto } from '../../application/dto/device.update.dto';
import { DeviceDto } from '../../application/dto/device.dto';
// Domain
import { DeviceService } from 'src/device/domain/interfaces/device.service.interface';
import { Device } from 'src/device/domain/entities/device.type';

// Shared
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { AuthGuard } from 'src/shared/infrastructure/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/infrastructure/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/domain/interfaces/paginated.result.interface';

@Controller('devices')
export class DeviceController extends BaseController {
  private mapper: DeviceMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject('DeviceService') private readonly service: DeviceService,
  ) {
    super();
    this.mapper = new DeviceMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<DeviceDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Device) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<DeviceDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Device) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<DeviceDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() device: CreateDeviceDto): Promise<DeviceDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(device));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() device: UpdateDeviceDto,
  ): Promise<DeviceDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(device),
    );
    return this.mapper.toDto(data);
  }
}
