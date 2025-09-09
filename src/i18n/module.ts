import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

// const rootPath = path.join(__dirname, '../../');
// const loaderPath = path.join(rootPath, '/src/i18n/');
// const typesPath = path.join(rootPath, './src/generated/i18n.generated.ts');

const rootPath = path.join(__dirname, '../');
const loaderPath = path.join(rootPath, './i18n/');
const typesPath =
  process.env.NODE_ENV === 'production'
    ? undefined
    : path.join(rootPath, './generated/i18n.generated.ts');

export const Module = I18nModule.forRoot({
  fallbackLanguage: 'en',
  loaderOptions: {
    // path: path.join(rootPath, './src/i18n/'),
    path: loaderPath,
    watch: true,
  },
  typesOutputPath: typesPath,
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
});
