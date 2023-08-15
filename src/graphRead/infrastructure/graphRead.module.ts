// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { GraphReadController } from './controllers/graphRead.controller';
import { GraphReadRepositoryImpl } from './aws_timestream/repositories/graphRead.repository';
import { GraphReadServiceImpl } from '../application/services/graphRead.service';
import { HttpModule } from '@nestjs/axios';

const providers: Provider[] = [
  {
    provide: 'GraphReadRepository',
    useClass: GraphReadRepositoryImpl,
  },
  {
    provide: 'GraphReadService',
    useClass: GraphReadServiceImpl,
  },
];

@Module({
  imports: [HttpModule],
  controllers: [GraphReadController],
  providers: providers,
})
export class GraphReadsModule {}
