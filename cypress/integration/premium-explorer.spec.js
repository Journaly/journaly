/**
 * We can use the `cypress-plugin-stripe-elements` plugin to interact with Stripe Elements
 * Docs: https://github.com/dbalatero/cypress-plugin-stripe-elements#readme
 */

describe('Subscribe to Premium', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/settings/subscription')
  })
  it('User enters invalid card number', () => {
    // TODO: Write test
  })
  it('User successfully signs up for monthly Premium subscription', () => {
    // TODO: Write test
  })
  it('User cancels subscription', () => {
    // TODO: Write test
  })
  it('User updates card on file', () => {
    // TODO: Write test
  })
})

describe('Post Bumping', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
  })
  it('User bumps old post', () => {
    // TODO: Write test
  })
})
