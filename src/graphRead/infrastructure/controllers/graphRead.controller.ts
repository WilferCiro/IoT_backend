// Nest
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

// Application
import { GraphReadMapper } from '../../application/mapper/graphRead.mapper';
import { GraphReadDto } from '../../application/dto/graphRead.dto';
// Domain
import { GraphReadService } from 'src/graphRead/domain/interfaces/graphRead.service.interface';

// Shared
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { AuthGuard } from 'src/shared/infrastructure/middleware/auth.middleware';
import { Roles } from 'src/shared/infrastructure/decorators/roles.decorator';

@Controller('graphReads')
export class GraphReadController extends BaseController {
  private mapper: GraphReadMapper;
  constructor(
    @Inject('GraphReadService') private readonly service: GraphReadService,
  ) {
    super();
    this.mapper = new GraphReadMapper();
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<GraphReadDto> {
    const data = await this.service.findAll();
    return this.mapper.toDto(data);
  }
}
