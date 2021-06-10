/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  const dotenvPlugin = require('cypress-dotenv')
  config = dotenvPlugin(config)

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}

// TODO: Look into instrumenting app with instanbul.js