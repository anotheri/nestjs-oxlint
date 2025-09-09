import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const referrerFactory = (
  data: unknown,
  ctx: ExecutionContext,
): string | undefined => {
  const httpReq = ctx.switchToHttp().getRequest<Request>();
  const referrer = httpReq.get('Referrer');

  return referrer;
};

export const Referrer = createParamDecorator(referrerFactory);
