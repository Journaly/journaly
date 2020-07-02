describe('Explores the Journaly landing page', () => {
  it('Visits the landing page', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Journaly')
  })
})
