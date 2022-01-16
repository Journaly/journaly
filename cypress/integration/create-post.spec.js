describe('New post flow', () => {
  it('User creates and views a new post', () => {
    const postTitle = `The Battle Of The Bastards ${Math.random()}`
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/new-post')
    cy.get('[data-testid=post-title]').type(postTitle)
    // Will fail until DB situation is figured out
    cy.get('[data-testid=post-language-select]').select('7')
    cy.get('[data-testid=post-body]').type('Ramsay really is a bastard.')
    // Will fail until DB situation is figured out
    cy.get('[data-testid=post-submit]').click()
    cy.url().should('include', '/post/')
    cy.contains('h1', postTitle)
  })
  it('User creates post without language selection', () => {
    const postTitle = `The Battle Of The Beards ${Math.random()}`
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/new-post')
    cy.get('[data-testid=post-title]').type(postTitle)
    cy.get('[data-testid=post-body]').type("Ramsay doesn't even have a bloody beard!.")
    cy.get('[data-testid=post-submit]').click()
    cy.get('[data-testid=new-post-error]').contains('noLanguageError')
  })
  it('User creates a draft post', () => {
    // TODO: Write test
  })
  it('User creates a post without language selection', () => {
    // TODO: Write test
  })
  it('User creates a post with topics', () => {
    // TODO: Write test
  })
  it('User publishes draft', () => {
    // TODO: Write test
  })
})
