import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  // model: {
  //   user: {
  //     findByEmail: async (email: string) => {
  //       return extendedPrismaClient.user.findFirstOrThrow({ where: { email } });
  //     },
  //   },
  // },

  result: {
    // user: {
    //   statusLabel: {
    //     needs: { status: true },
    //     compute(user) {
    //       return {
    //         '-1': 'INVALID',
    //         '0': 'BLOCKED',
    //         '1': 'PENDING_EMAIL',
    //         '2': 'PENDING_MFA',
    //         '3': 'ACTIVE',
    //       }[user.status];
    //     },
    //   },
    // },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
