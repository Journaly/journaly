describe('Checks My Feed works as expected', () => {
  beforeEach(() => {
    cy.visit('/dashboard/login')
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    // const url = Cypress.env('DATABASE_URL')
    cy.intercept('http://localhost:3000/api/graphql', {
      fixture: 'feed',
    })
  })
  it('loads the feed', () => {
    cy.fixture('feed').then((jsonData) => {
      expect(jsonData.posts.length).to.eq(9)
    })
  })
})
