describe('User completes their profile', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/dashboard/settings/profile')
  })
  it('User fills out personal details and bio', () => {
    // TODO: Write test
    // Name
    // City
    // Country
    // Bio
  })
  it('User adds language info ', () => {
    // TODO: Write test
  })
  it('User fills out their interests', () => {
    // TODO: Write test
  })
  it('User adds social links', () => {
    // TODO: Write test
  })
})
