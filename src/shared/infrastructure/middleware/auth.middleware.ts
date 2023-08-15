import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/users/domain/interfaces/user.service.interface';
import { RequestContextService } from 'src/modules/context/domain/interfaces/context.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
    @Inject('UserService') private readonly userService: UserService,
    @Inject('RequestContext')
    private readonly contextService: RequestContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('SECRET_JWT'),
      });
      const [user, userRoles] = await Promise.all([
        await this.userService.findById(payload.id),
        await this.userService.getRolesById(payload.id),
      ]);
      if (!payload.id || !user) {
        throw new UnauthorizedException();
      }
      request['user'] = { ...user, password: undefined, roles: userRoles };
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles || roles[0] === null || roles[0] === 'general') {
        return true;
      }
      const valid = roles.some((role) => userRoles.includes(role));

      this.contextService.set<string>('token', token);
      return valid;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
