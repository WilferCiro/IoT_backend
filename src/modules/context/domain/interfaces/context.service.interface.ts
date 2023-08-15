import { Request } from 'express';

export interface RequestContextService {
  set<T>(key: string, value: T): void;

  get<T>(key: string): T | undefined;

  getRequest(): Request;
}
