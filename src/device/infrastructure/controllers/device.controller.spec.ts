import { DeviceService } from 'src/device/domain/interfaces/device.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceServiceImpl } from '../services/device.service';
import { CreateDeviceDto } from '../dto/device.create.dto';
import {
  deviceCreateDataFake as registerCreateDataFake,
  deviceDataFake as registerDataFake,
  deviceUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/device.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { DeviceRepositoryImpl } from 'src/device/infrastructure/sql/repositories/device.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/device/infrastructure/sql/entities/device.entity';
import { Repository } from 'typeorm';
import { DeviceMapper } from '../mapper/device.mapper';

describe('DevicesController', () => {
  let devicesController: DeviceController;
  let devicesService: DeviceService;
  let mapper: DeviceMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(DeviceEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'DeviceRepository',
          useClass: DeviceRepositoryImpl,
        },
        {
          provide: 'DeviceService',
          useClass: DeviceServiceImpl,
        },
      ],
    }).compile();
    mapper = new DeviceMapper();
    devicesController = module.get<DeviceController>(DeviceController);
    devicesService = module.get<DeviceService>('DeviceService');
  });

  describe('createDevice', () => {
    it('should return the created device', async () => {
      // Arrange
      const deviceDto: CreateDeviceDto = registerCreateDataFake[0];
      const createdDevice = { id: 1, ...deviceDto };
      jest.spyOn(devicesService, 'create').mockResolvedValue(createdDevice);

      // Act
      const result = await devicesController.create(deviceDto);

      // Assert
      expect(result).toEqual({ ...createdDevice, password: undefined });
    });
  });

  describe('getDevice', () => {
    it('should return the requested device by ID', async () => {
      // Arrange
      const device = registerDataFake[0];
      jest.spyOn(devicesService, 'findById').mockResolvedValue(device);

      // Act
      const result = await devicesController.findById(device.id);
      // Assert
      expect(result).toEqual(mapper.toDto(device));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(devicesService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await devicesController.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe('updateDevice', () => {
    it('should return the updated device', async () => {
      // Arrange
      const deviceId = 1;
      const updatedDeviceDto = registerUpdateDataFake[0];
      const updatedDevice = registerDataFake[0];
      jest.spyOn(devicesService, 'update').mockResolvedValue(updatedDevice);

      // Act
      const result = await devicesController.update(deviceId, updatedDeviceDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedDevice));
    });
  });
});
