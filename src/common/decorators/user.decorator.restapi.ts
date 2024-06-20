import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPayload } from '../interfaces/payload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
