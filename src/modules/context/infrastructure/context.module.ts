import { Global, Module, Provider } from '@nestjs/common';
import { RequestContextServiceImpl } from '../application/services/context.service';

const moduleProviders: Provider[] = [
  {
    provide: 'RequestContext',
    useClass: RequestContextServiceImpl,
  },
  {
    provide: 'RequestContext',
    useClass: RequestContextServiceImpl,
  },
];

@Global()
@Module({
  providers: [...moduleProviders],
  exports: [...moduleProviders],
})
export class RequestContextModule {}
