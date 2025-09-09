import * as Sentry from '@sentry/node';

import 'dotenv/config';

import { version } from '../package.json';
// Ensure to call this before requiring any other modules!

import { nodeProfilingIntegration } from '@sentry/profiling-node';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  environment: process.env.NODE_ENV || 'development',

  // version format here should be aligned with the version in the Github Action
  release: `${process.env.SENTRY_PROJECT}@${version}`,

  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),

    Sentry.prismaIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: isProd ? 0.2 : 1.0,

  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: [
  //   // 'localhost',
  // ],

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: isProd ? 0.2 : 1.0,

  // Disable transport in development, transaction are still captured in debug mode, check the console
  // enabled: false,
  enabled: !isDev,

  // Enable debug mode to log event submission
  // debug: isDev,
  debug: false,

  // Advanced, optional: Called for message and error events
  beforeSend(event) {
    // Modify or drop the event here
    return event;
  },

  // Advanced, optional: Called for transaction events, you can further debug your transactions here
  beforeSendTransaction(event) {
    // Modify or drop the event here
    return event;
  },
});
