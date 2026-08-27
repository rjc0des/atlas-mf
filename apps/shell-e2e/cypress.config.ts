const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      "cypressDir": "src",
      "webServerCommands": {
        "default": "npx nx run @atlas-mf/shell:serve",
        "production": "npx nx run @atlas-mf/shell:serve-static"
      },
      "ciWebServerCommand": "npx nx run @atlas-mf/shell:serve-static",
      "ciBaseUrl": "http://localhost:4200"
    }),
    baseUrl: 'http://localhost:4200',
  },
});
