import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    TEST_PORT: 3001,
    BASE_URL: "http://localhost:",
    // other cypress environment variables here
  },

  redirectionLimit: 50,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
