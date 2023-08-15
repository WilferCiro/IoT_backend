// Nest

// Domain
import { GraphRead } from '../entities/graphRead.type';

// Shared

export interface GraphReadService {
  findAll(): Promise<GraphRead>;
}
