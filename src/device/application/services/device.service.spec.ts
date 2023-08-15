import { DeviceService } from 'src/device/domain/interfaces/device.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
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
import { DeviceRepository } from 'src/device/domain/interfaces/device.repository.interface';

describe('DevicesController', () => {
  let devicesService: DeviceService;
  let devicesRepository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    devicesRepository = module.get<DeviceRepository>('DeviceRepository');
    devicesService = module.get<DeviceService>('DeviceService');
  });

  describe('createDevice', () => {
    it('should return the created device', async () => {
      // Arrange
      const deviceDto: CreateDeviceDto = registerCreateDataFake[0];
      const createdDevice = { id: 1, ...deviceDto };
      jest
        .spyOn(devicesRepository, 'create')
        .mockResolvedValue({ ...createdDevice, password: undefined });

      // Act
      const result = await devicesService.create(deviceDto, false);

      // Assert
      expect(result).toEqual({ ...createdDevice, password: undefined });
    });
  });

  describe('getDevice', () => {
    it('should return the requested device by ID', async () => {
      // Arrange
      const device = registerDataFake[0];
      jest.spyOn(devicesRepository, 'findById').mockResolvedValue(device);

      // Act
      const result = await devicesService.findById(device.id);

      // Assert
      expect(result).toEqual(device);
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(devicesRepository, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await devicesService.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake,
      });
    });
  });

  describe('updateDevice', () => {
    it('should return the updated device', async () => {
      // Arrange
      const deviceId = 1;
      const updatedDeviceDto = registerUpdateDataFake[0];
      const updatedDevice = registerDataFake[0];
      jest.spyOn(devicesRepository, 'update').mockResolvedValue(updatedDevice);

      // Act
      const result = await devicesService.update(deviceId, updatedDeviceDto);

      // Assert
      expect(result).toEqual(updatedDevice);
    });
  });
});
