import "cypress-localstorage-commands"

// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('login', () => {
  cy.get('[data-testid=email]').type('j@n.com')
  cy.get('[data-testid=password]').type('password{enter}')
  cy.url().should('include', '/dashboard/my-feed')
})

// TODO (robin-macpherson): Try to get something like this to work
// so that we build up state programmatically and don't build up state in the UI.
// Cypress.Commands.add('login', () => {
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:4000/graphql',
//     body: {
//       operationName: 'loginUser',
//       query: '...',
//       variables: {
//         identifier: 'j@n.com',
//         password: 'password',
//       },
//     },
//   })
// })

Cypress.Commands.add('signup', () => {
  cy.get('[data-testid=display-name]').type('smartest_man_in_westeros_91')
  cy.get('[data-testid=email]').type('tyri@n.com')
  cy.get('[data-testid=password]').type('password{enter}')
  cy.url().should('include', '/dashboard/my-feed')
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
