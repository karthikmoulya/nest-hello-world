import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //roles validation
    //
    return this.validationRequest(request);
  }

  public validationRequest(req): Promise<any> | any | Observable<any> {
    return Promise.resolve(Boolean);
  }
}
