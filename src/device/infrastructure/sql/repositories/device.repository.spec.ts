import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

// Device specific
import { DeviceRepositoryImpl } from './device.repository';
import { DeviceEntity } from '../entities/device.entity';
import { deviceDataFake as registerDataFake } from 'src/test/mock/device.sql.fake';

describe('DeviceRepository', () => {
  let repository: DeviceRepositoryImpl;
  let repositoryToken: string;
  let repositoryMock: Repository<DeviceEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceRepositoryImpl,
        {
          provide: getRepositoryToken(DeviceEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<DeviceRepositoryImpl>(DeviceRepositoryImpl);
    repositoryToken = getRepositoryToken(DeviceEntity) as string;
    repositoryMock = module.get<Repository<DeviceEntity>>(repositoryToken);
  });

  describe('createDevice', () => {
    it('should create a new register', async () => {
      const newDevice: DeviceEntity = registerDataFake[0];
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(newDevice);

      const result = await repository.create(newDevice);

      expect(saveSpy).toHaveBeenCalledWith(newDevice);
      expect(result).toEqual(newDevice);
    });
  });

  describe('updateDevice', () => {
    it('should update a register', async () => {
      const register: DeviceEntity = registerDataFake[0];
      const register2: DeviceEntity = registerDataFake[1];
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(register2);
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.update(register.id, register2);

      expect(findSpy).toHaveBeenCalledWith({ id: register.id });
      expect(saveSpy).toHaveBeenCalledWith({ id: register.id, ...register2 });
      expect(result).toEqual(register2);
    });
    it('should not update a register', async () => {
      const register: DeviceEntity = registerDataFake[0];
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(undefined);

      await expect(repository.update(register.id, register)).rejects.toThrow(
        new BadRequestException(`El REGISTRO no está registrado`),
      );
    });
  });

  describe('getDevice', () => {
    it('should findAll registers', async () => {
      const registers: DeviceEntity[] = registerDataFake;
      const findSpy = jest
        .spyOn(repositoryMock, 'findBy')
        .mockResolvedValue(registers);

      const result = await repository.findAll();

      expect(findSpy).toHaveBeenCalledWith({ active: true });
      expect(result).toEqual(registers);
    });
    it('should find by ID', async () => {
      const register: DeviceEntity = registerDataFake[0];
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.findById(register.id);
      expect(findSpy).toHaveBeenCalledWith({ id: register.id });
      expect(result).toEqual(register);
    });
    it('should find paginated', async () => {
      const registers: DeviceEntity[] = registerDataFake;
      jest
        .spyOn(repositoryMock, 'findAndCount')
        .mockResolvedValue([registers, registers.length]);

      const result = await repository.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
      });
      expect(result).toEqual({ total: registers.length, data: registers });
    });
  });
});
