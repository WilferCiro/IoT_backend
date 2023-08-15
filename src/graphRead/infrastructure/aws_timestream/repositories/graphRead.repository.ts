// Nestjs
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// infrastructure

// Application

// Domain
import { GraphRead } from '../../../domain/entities/graphRead.type';
import { GraphReadRepository } from '../../../domain/interfaces/graphRead.repository.interface';

// Shared

// AWS
import {
  TimestreamQueryClient,
  CancelQueryCommand,
  CancelQueryCommandInput,
} from '@aws-sdk/client-timestream-query';

@Injectable()
export class GraphReadRepositoryImpl implements GraphReadRepository {
  private readonly client: TimestreamQueryClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new TimestreamQueryClient({
      region: configService.get('AWS_REGION'), //'us-east-2',
      credentials: {
        accessKeyId: configService.get('AWS_TIMESTREAM_ACCESSKEY'),
        secretAccessKey: configService.get('AWS_TIMESTREAM_SECRETACCESSKEY'),
      },
    });
  }

  private async executeQuery(): Promise<any> {
    try {
      const params: CancelQueryCommandInput = {
        QueryId: '', // Add Query ID of your sql
      };
      const command = new CancelQueryCommand(params);
      const queryResult = await this.client.send(command);
      return queryResult;
    } catch (error) {
      console.error('Error executing TimeStream query:', error);
      throw error;
    }
  }

  async findAll(): Promise<GraphRead> {
    const result = await this.executeQuery();
    console.log(result);
    return result as GraphRead;
  }
}
