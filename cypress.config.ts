import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.solenersync.net',
  },
  env: {
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
    TEST_USER_NAME: process.env.TEST_USER_NAME,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    baseUrl: 'https://www.solenersync.net',
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },
});
