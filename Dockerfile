# --------------------------------------
# Development stage
# This stage is used for development and testing.
# --------------------------------------
FROM node:24.7-alpine AS development

LABEL maintainer="anotheri"

ENV NODE_ENV=development
ENV APPLICATION=nestjs-oxlint
ARG ARCH
RUN echo "Building for architecture: $ARCH"

# This line installs some packages using the Alpine package manager.
RUN apk add \
  # This package includes the necessary tools for building native Node.js modules. +234MB = 356MB
  build-base \
  # Python is required for some Node.js modules that have native dependencies.+40MB = 396MB
  python3

# Installs the node-gyp package globally using npm.
# node-gyp is a tool for building native Node.js modules.
# +17MB = 413MB
# RUN npm install -g node-gyp

# Sets the working directory inside the container to /usr/src/app.
WORKDIR /usr/src/app

# Copy the whole application code to the container
COPY . ./
# COPY --chown=node:node . ./

# Copy the yarn and package.json files related to dependencies
# COPY --chown=node:node .yarn ./.yarn
# COPY --chown=node:node ./yarn.lock ./.yarnrc.yml ./package.json ./

# # Install application dependencies
RUN yarn install --immutable

# Sets an environment variable that tells the Prisma ORM to ignore missing engine checksums.
# This is useful when deploying to certain platforms like Heroku.
# ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Generate the Prisma client code based on the schema
RUN yarn db:generate



# --------------------------------------
# Build stage (dist)
# This stage is used for building the application for production.
# --------------------------------------

FROM node:24.7-alpine AS build-dist

ENV NODE_ENV=production
ENV APPLICATION=nestjs-oxlint
WORKDIR /usr/src/app

# Copy the whole dev code to the container
COPY --chown=node:node --from=development /usr/src/app/ ./

# Build the application for production
RUN yarn build

USER node



# --------------------------------------
# Build stage (deps)
# This stage is used for building the application for production.
# --------------------------------------

FROM node:24.7-alpine AS build-deps

ENV NODE_ENV=production
ENV APPLICATION=nestjs-oxlint
ARG VERSION='0.0.0'
RUN echo VERSION: $VERSION

WORKDIR /usr/src/app

# Copy the files related to dependencies
COPY --chown=node:node --from=development /usr/src/app/.yarn ./.yarn
COPY --chown=node:node --from=development /usr/src/app/yarn.lock /usr/src/app/package.json /usr/src/app/.yarnrc.yml ./


# Bump version and install application dependencies for production (omitting devDependencies)
RUN yarn version $VERSION && yarn workspaces focus --production
COPY --chown=node:node --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

USER node



# --------------------------------------
# Migration stage
# This stage is used for running database migrations with Prisma.
# --------------------------------------

FROM node:24.7-alpine AS migration

ENV NODE_ENV=production
ENV APPLICATION=nestjs-oxlint
WORKDIR /usr/src/app

# Copy the files related to migrations
COPY --chown=node:node --from=development /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=development /usr/src/app/.yarn ./.yarn
COPY --chown=node:node --from=development /usr/src/app/yarn.lock /usr/src/app/package.json /usr/src/app/.yarnrc.yml ./

USER node

ENTRYPOINT ["yarn", "db:migrate:deploy"]



# --------------------------------------
# Export dist stage
# This stage is used to export the dist folder for getting sourcemaps
# --------------------------------------

FROM scratch AS export-dist
COPY --from=build-dist /usr/src/app/dist .



# --------------------------------------
# Production stage
# This stage is used for running the application in production.
# --------------------------------------

# Install dumb-init to handle signals properly in Docker
FROM building5/dumb-init:1.2.1 AS dumb-init

# 284MB (290MB if we support all architectures in .yarnrc.yml)
FROM node:24.7-alpine AS production

ENV NODE_ENV=production
ENV APPLICATION=nestjs-oxlint
# avoid the corepack check so we don't need .yarn directory in prod image
ENV SKIP_YARN_COREPACK_CHECK=0

WORKDIR /usr/src/app

COPY --chown=node:node --from=dumb-init /dumb-init /usr/local/bin/
COPY --chown=node:node --from=build-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build-deps /usr/src/app/package.json ./
COPY --chown=node:node --from=build-dist /usr/src/app/dist ./dist

USER node

# Expose the port that your application will run on
# EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

# Define the command to run your application
CMD ["yarn", "start:prod"]
