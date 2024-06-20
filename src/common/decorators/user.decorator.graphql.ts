import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IPayload } from '../interfaces/payload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IPayload => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
