describe('/login', () => {
  beforeEach(() => {
    cy.visit('/dashboard/login')
  })

  it('greets user with Log In', () => {
    cy.contains('h2', 'Log into your account')
  })

  it('links to /signup', () => {
    cy.contains('Sign up').should('have.attr', 'href', '/dashboard/signup')
  })

  it('requires email address', () => {
    cy.get('form').contains('Log In').click()
    cy.get('p', 'Email is required')
  })

  it('requires password', () => {
    cy.get('form').contains('Log In').click()
    cy.get('p', 'Password is required')
  })

  it('redirects user to /dashboard/my-feed on succesful login', () => {
    cy.get('[data-test=email]').type('j@n.com')
    cy.get('[data-test=password]').type('password{enter}')
    cy.url().should('include', '/dashboard/my-feed')
  })
})
