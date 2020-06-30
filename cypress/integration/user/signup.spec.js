describe('/login', () => {
  beforeEach(() => {
    cy.visit('/dashboard/signup')
  })

  it('greets user with Log In', () => {
    cy.contains('h2', 'Sign up for an account')
  })

  it('links to /signup', () => {
    cy.contains('Sign up').should('have.attr', 'href', '/dashboard/signup')
  })

  it('requires display name', () => {
    cy.get('form').contains('Sign up!').click()
    cy.get('p', 'Display Name is required')
  })

  it('requires email address', () => {
    cy.get('form').contains('Sign up!').click()
    cy.get('p', 'Email is required')
  })

  it('requires valid email address', () => {
    cy.get('[data-test=email]').type('jon')
    cy.get('p', 'Invalid email address')
  })

  it('requires password', () => {
    cy.get('form').contains('Sign up!').click()
    cy.get('p', 'Password is required')
  })

  it('requires valid password', () => {
    cy.get('[data-test=password]').type('12{enter}')
    cy.get('p', 'Password must be at least 6 characters')
  })

  it('redirects user to /dashboard/my-feed on succesful signup', () => {
    cy.get('[data-test=display-name]').type('smartest_man_in_westeros_91')
    cy.get('[data-test=email]').type('tyri@n.com')
    cy.get('[data-test=password]').type('password{enter}')
    cy.url().should('include', '/dashboard/my-feed')
  })
})
