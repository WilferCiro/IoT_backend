// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { DeviceController } from './controllers/device.controller';
import { DeviceRepositoryImpl } from './sql/repositories/device.repository';
import { DeviceServiceImpl } from '../application/services/device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from './sql/entities/device.entity';

const providers: Provider[] = [
  {
    provide: 'DeviceRepository',
    useClass: DeviceRepositoryImpl,
  },
  {
    provide: 'DeviceService',
    useClass: DeviceServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  controllers: [DeviceController],
  providers: providers,
})
export class DevicesModule {}
