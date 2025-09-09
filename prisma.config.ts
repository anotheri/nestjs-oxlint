import 'dotenv/config'; // to load .env file
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
    seed: 'node -r @swc-node/register prisma/seed.ts',
  },
});
