import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

const r = (path: string) => new URL(path, import.meta.url).pathname;

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          root: './',
          // globals: true,
          setupFiles: ['./tests/helpers/setup.ts'],
        },
        resolve: {
          alias: {
            '@src/': r('./src/'),
            '@tests/': r('./tests/'),
          },
        },
        plugins: [
          // This is required to build the test files with SWC
          swc.vite(),
        ],
      },
      {
        test: {
          name: 'e2e',
          // environment: 'node',
          environment: 'tests/helpers/vitest-environment-prisma',
          include: ['tests/**/*.(e2e-)?{test,spec}.?(c|m)[jt]s?(x)'],
          root: './',
          // globals: true,
          poolOptions: {
            forks: {
              isolate: true,
              singleFork: true,
            },
          },
          setupFiles: ['./tests/helpers/setup.ts'],
          // retry: 2,
        },
        resolve: {
          alias: {
            '@src/': r('./src/'),
            '@tests/': r('./tests/'),
          },
        },
        plugins: [
          // This is required to build the test files with SWC
          swc.vite(),
        ],
      },
    ],
  },
});
