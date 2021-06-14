describe('Runs the app and makes sure everything is up', () => {
  beforeEach(() => {
    cy.visit('/dashboard/login')
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
  })
  it('Visits the landing page', () => {
    cy.visit('/')
    cy.contains('Journaly')
  })
  it('Visits the My Feed page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-header]')
  })
  it('Navigates to the My Posts page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-posts-nav-link]').click()
    cy.get('[data-testid=my-posts-header]')
  })
  it('Navigates to the Settings page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=settings-nav-link]').click()
    cy.get('[data-testid=settiings-breadcrumbs]')
  })
})
