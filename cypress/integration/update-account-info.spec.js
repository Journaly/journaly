describe('Update account information', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/settings/profile')
  })
  it('User updates handle', () => {
    // TODO: Write test
  })
  it('User updates email address', () => {
    // TODO: Write test
  })
  it('User updates language list', () => {
    // TODO: Write test
  })
  it('User updates password', () => {
    // TODO: Write test
  })
})
