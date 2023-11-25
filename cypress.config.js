import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    DB_PATH: "./cypress/e2e/tests/testDB/testDatabase.db"
  },
  redirectionLimit: 50

});