// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { GraphRead } from 'src/graphRead/domain/entities/graphRead.type';
import { GraphReadRepository } from 'src/graphRead/domain/interfaces/graphRead.repository.interface';
import { GraphReadService } from 'src/graphRead/domain/interfaces/graphRead.service.interface';

// Shared

@Injectable()
export class GraphReadServiceImpl implements GraphReadService {
  constructor(
    @Inject('GraphReadRepository')
    private readonly repository: GraphReadRepository,
  ) {}

  async findAll(): Promise<GraphRead> {
    return await this.repository.findAll();
  }
}
