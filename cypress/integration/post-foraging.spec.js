describe('Checks My Feed works as expected', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
  })
  it('User visits the My Feed page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-header]').should('exist')
  })
  it('User views the first post in the feed', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-post-card]')
      .first()
      .then(($post) => {
        const postUrl = $post.attr('href')
        cy.get('[data-testid=my-feed-post-card]').first().click()
        cy.url().should('include', postUrl)
      })
  })
  it('User views their "my posts" page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-posts-nav-link]').click()
    cy.get('[data-testid=my-posts-header]')
  })
})
