import { Module } from '@nestjs/common';
import { UsersModule } from './users/infrastructure/user.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { CoreModule } from './shared/core.module';
import { PostgresProvider } from './shared/infrastructure/database/postgresql/postgresql.provider';
import { EmailProvider } from './shared/infrastructure/email/email.provider';
import { GraphReadsModule } from './graphRead/infrastructure/graphRead.module';
import { DevicesModule } from './device/infrastructure/device.module';

@Module({
  imports: [
    CoreModule,
    PostgresProvider,
    EmailProvider,
    UsersModule,
    AuthModule,
    GraphReadsModule,
    DevicesModule,
  ],
})
export class AppModule {}
