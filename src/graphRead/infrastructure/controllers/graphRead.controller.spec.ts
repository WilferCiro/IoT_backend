import { GraphReadService } from 'src/graphRead/domain/interfaces/graphRead.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphReadController } from './graphRead.controller';
import { GraphReadServiceImpl } from '../../application/services/graphRead.service';
import { graphReadDataFake as registerDataFake } from 'src/test/mock/graphRead.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { GraphReadRepositoryImpl } from 'src/graphRead/infrastructure/http/repositories/graphRead.repository';
import { GraphReadMapper } from '../../application/mapper/graphRead.mapper';

describe('GraphReadsController', () => {
  let graphReadsController: GraphReadController;
  let graphReadsService: GraphReadService;
  let mapper: GraphReadMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphReadController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        PasswordHelper,
        {
          provide: 'GraphReadRepository',
          useClass: GraphReadRepositoryImpl,
        },
        {
          provide: 'GraphReadService',
          useClass: GraphReadServiceImpl,
        },
      ],
    }).compile();
    mapper = new GraphReadMapper();
    graphReadsController = module.get<GraphReadController>(GraphReadController);
    graphReadsService = module.get<GraphReadService>('GraphReadService');
  });

  describe('getGraphRead', () => {
    it('should return the requested all', async () => {
      // Arrange
      const graphRead = registerDataFake[0];
      jest.spyOn(graphReadsService, 'findAll').mockResolvedValue(graphRead);

      // Act
      const result = await graphReadsController.findAll();
      // Assert
      expect(result).toEqual(mapper.toDto(graphRead));
    });
  });
});
