import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
// import { User } from '@prisma/client';
// import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const contextFactory = (
  data: unknown,
  context: ExecutionContext,
): ExecutionContext => {
  // for GraphQL
  // const ctx = GqlExecutionContext.create(context);
  // const req = ctx.getContext().req;

  return context;
};

/**
 * Defines HTTP route param decorator
 * @return current request context and request object
 */
export const Context = createParamDecorator(contextFactory);
