/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const dotenvPlugin = require('cypress-dotenv')
module.exports = (on, config) => {
  config = dotenvPlugin(config)
  require('@cypress/code-coverage/task')(on, config)

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}

// TODO: Look into instrumenting app with instanbul.js