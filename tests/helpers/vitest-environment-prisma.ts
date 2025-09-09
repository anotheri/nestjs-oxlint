import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import type { Environment } from 'vitest/environments';
// import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

import prisma from './prisma';
// const prisma = new PrismaClient();

dotenvExpand.expand(dotenv.config());

// console.debug('process.env:', process.env);

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }

  const databaseURL = process.env.DATABASE_URL;
  let newDatabaseUrl = '';

  if (databaseURL.startsWith('mysql://')) {
    // mysql://root:password@mysql:3306/local
    // → mysql://root:password@mysql:3306/new-schema
    const reMysqlSchema = /\/[a-z0-9]+(?:[_-][a-z0-9]+)*$/i;
    newDatabaseUrl = databaseURL.replace(reMysqlSchema, `/${schema}`);
  }

  if (databaseURL.startsWith('postgresql://')) {
    // postgresql://user:password@postgres:5432/local?schema=local
    // → postgresql://user:password@postgres:5432/local?schema=new-schema
    const rePostgresSchema = /\?schema=[a-z0-9-_]+/i;
    newDatabaseUrl = databaseURL.replace(rePostgresSchema, `?schema=${schema}`);
  }

  console.debug('DATABASE_URL:', newDatabaseUrl);
  const url = new URL(newDatabaseUrl);

  // url.searchParams.set('schema', schema);

  return {
    url: url.toString(),
    type: url.protocol.replace(':', ''),
  };
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    // rewrite DATABASE_URL env variable
    const schema = randomUUID();
    const { url: databaseURL, type } = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;

    // setup database
    // execSync('yarn db:migrate --skip-seed');
    // execSync('yarn db:migrate:deploy');
    execSync('yarn db:push');

    if (type === 'mysql') {
      // workaround to increase connections limit for e2e tests
      // await prisma.$executeRawUnsafe(`
      //   SET GLOBAL max_connections = 500;
      // `);
    }

    // custom setup
    return {
      async teardown() {
        if (type === 'mysql') {
          // called after all tests with this env have been run
          await prisma.$executeRawUnsafe(`
            DROP DATABASE \`${schema}\`;
          `);
        } else if (type === 'postgresql') {
          // called after all tests with this env have been run
          await prisma.$executeRawUnsafe(`
            DROP SCHEMA "${schema}" CASCADE;
          `);
        }

        // SELECT GROUP_CONCAT('DROP TABLE IF EXISTS ', table_name, ';')
        // FROM information_schema.tables
        // WHERE table_schema = '${schema}';
        await prisma.$disconnect();
      },
    };
  },
};
