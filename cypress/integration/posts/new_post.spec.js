describe('/new-post', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard/new-post')
  })

  it('successfully creates a post', () => {
    cy.get('[data-test=post-title]').type('The Battle Of The Bastards')
    cy.get('[data-test=post-body]').type('Ramsay really is a bastard.')
    cy.get('[data-test=post-submit]').click()
    cy.url().should('include', '/post/')
    cy.contains('h1', 'The Battle Of The Bastards')
  })
})
