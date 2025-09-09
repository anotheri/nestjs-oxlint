# Nestjs + oxlint

This is boilerplate example of NestJS application with oxlint setup.

## 🛠️ Setup

### ⚙️ Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### 🔑 Setup environment variables

Create `.env` file in the root of the project and fill it with the following content. You can either use `.env.example`, copy it and fill in the values manually:

```bash
$ cp .env.example .env
```

### 🐳 Docker environment

```bash
# install
$ yarn

# build docker image (if uses amd64 architecture build by default)
$ yarn bake

# alternatively if you use Apple Silicone build docker image for arm64 architecture with the following command:
$ yarn bake arm

# run containers
$ yarn dev

# setup database (sync prisma schema with your database)
$ yarn dev:exec db:push

# insert seed data into database
$ yarn dev:exec db:seed

# stop all the containers if you don't need them anymore
$ yarn down
```

Currently HMR is not enabled, so the server will reload on every file change.

## 🧬 Use Prisma Studio

You can view / edit DB tables using [Prisma Studio](https://www.prisma.io/studio).

Once you run `yarn dev`, you can open it in `http://localhost:5555`.

## 🧬 Prisma Migrations (Development)

1. Execude the following command from the application container to create Prisma migration for preview only (it will not apply the migration):

```bash
$ yarn dev:exec db:migrate:pre
```

2. Adjust the migration file in `prisma/migrations` folder if needed.

3. Run command to apply the migration:

```bash
$ yarn dev:exec db:migrate
```

Note: you can use the last command to generate the migrations and apply them as soon as possible without preview, but it's not recommended.

Note: you can reset the database to the initial state by running

```bash
$ yarn dev:exec db:migrate:reset
```

## 🧰 Typebox schemas and DTOs

We use [Typebox](https://github.com/sinclairzx81/typebox) schemas to validate request bodies and serizalize responses.

Also check [Nestjs-typebox docs](https://github.com/jayalfredprufrock/nestjs-typebox) to get familiar with tools which help us implement the validators/serializers into the NestJS application.

## 🌍 Internalization (i18n)

We use [nestjs-i18n](https://nestjs-i18n.com/) for internalization. To add new translation key you need to copy default language data from `src/i18n/en/*.json` to `src/i18n/<LANG>/*.json`, where `<LANG>` is the language code (e.g. `ru` for Russian). Then you can translate the keys in json files.

It also generates types for translation keys in `src/generated/i18n.generated.ts` file, so you can use them in your code. Read more [here](https://nestjs-i18n.com/guides/type-safety).

## 📚 Swagger

Swagger UI is available on `http://localhost:3000/docs/api`

Open API JSON format is available on `http://localhost:3000/docs/api-json`

## 🧪 Test

More examples on how to test NestJS application can be found in [this repo](https://github.com/jmcdo29/testing-nestjs/tree/6c77b2a5001a48673c77c9659d985a083354579f/apps/complex-sample).

```bash
# unit tests
$ yarn dev:exec test

# e2e tests
$ yarn dev:exec test:e2e

# test coverage
$ yarn dev:exec test:cov

# test coverage for a certain directory, e.g. auth
$ yarn dev:exec test:cov --coverage.include='src/auth/**/*' auth
```
