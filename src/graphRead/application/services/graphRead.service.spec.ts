import { GraphReadService } from 'src/graphRead/domain/interfaces/graphRead.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphReadServiceImpl } from '../services/graphRead.service';
import { graphReadDataFake as registerDataFake } from 'src/test/mock/graphRead.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { GraphReadRepositoryImpl } from 'src/graphRead/infrastructure/http/repositories/graphRead.repository';
import { GraphReadRepository } from 'src/graphRead/domain/interfaces/graphRead.repository.interface';

describe('GraphReadsController', () => {
  let graphReadsService: GraphReadService;
  let graphReadsRepository: GraphReadRepository;

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

    graphReadsRepository = module.get<GraphReadRepository>(
      'GraphReadRepository',
    );
    graphReadsService = module.get<GraphReadService>('GraphReadService');
  });

  describe('getGraphRead', () => {
    it('should return all', async () => {
      // Arrange
      const graphRead = registerDataFake[0];
      jest.spyOn(graphReadsRepository, 'findAll').mockResolvedValue(graphRead);

      // Act
      const result = await graphReadsService.findAll();

      // Assert
      expect(result).toEqual(graphRead);
    });
  });
});
