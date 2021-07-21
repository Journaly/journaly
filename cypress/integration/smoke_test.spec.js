describe('Checks the site is up', () => {
  it('Visits landing page and makes sure site loads', () => {
    cy.visit('/')
    cy.get('[data-testid=landing-elevator-pitch]')
      .should('exist')
  })
})
