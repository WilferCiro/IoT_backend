// Nest
import { Injectable } from '@nestjs/common';

// Application
import { GraphReadDto } from '../dto/graphRead.dto';

// Domain
import { GraphRead } from 'src/graphRead/domain/entities/graphRead.type';

// Shared

@Injectable()
export class GraphReadMapper {
  toDto(graphRead: GraphRead): GraphReadDto {
    return graphRead as GraphReadDto;
  }
}
