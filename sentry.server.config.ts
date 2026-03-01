import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://41865b188dcc055239158b88aa015f13@o4510677891481600.ingest.de.sentry.io/4510968521818192",

  enableLogs: true,
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
