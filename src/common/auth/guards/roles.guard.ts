import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // allow access if role specified
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //if not authorized
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException(
        'You are not authorized to access this route',
      );
    }

    return true;
  }
}
