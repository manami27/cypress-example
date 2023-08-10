const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://k-admin.devucc.name',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
