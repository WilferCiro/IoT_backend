// Nest

// Domain
import { GraphRead } from '../entities/graphRead.type';

// Shared

export interface GraphReadRepository {
  findAll(): Promise<GraphRead>;
}
