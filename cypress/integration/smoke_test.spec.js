describe('Runs the app and makes sure everything is up', () => {
  beforeEach(() => {
    cy.visit('/dashboard/login')
    cy.login()
  })
  it('Visits the landing page', () => {
    cy.visit('/')
    cy.contains('Journaly')
  })
  it('Visits the My Feed page', () => {
    cy.visit('/dashboard/my-feed')
    cy.contains('h1', 'My Feed')
  })
  it('Navigates to the My Posts page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('.nav-link').contains('My Posts').click()
    cy.contains('h1', 'My Posts')
  })
  it('Navigates to the Settings page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('.nav-link').contains('Settings').click()
    cy.contains('h1', 'Settings')
  })
})
