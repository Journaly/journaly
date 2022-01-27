describe('User logs in', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
  })

  it('Form requires email address', () => {
    cy.get('[data-testid=login-button]').click()
    cy.contains('p', 'emailRequiredErrorMessage').should('exist')
  })

  it('Form requires password', () => {
    cy.get('[data-testid=login-button]').click()
    cy.contains('p', 'passwordRequiredErrorMessage').should('exist')
  })

  it('Form requires valid password', () => {
    cy.get('[data-testid=email]').type('valid@email.com')
    cy.get('[data-testid=password]').type('12{enter}')
    cy.contains('p', 'passwordMinimumErrorMessage')
  })

  it('User successfully logs in and is redirected "My Feed" page', () => {
    cy.get('[data-testid=email]').type('j@n.com')
    cy.get('[data-testid=password]').type('password{enter}')
    cy.get('[data-testid=my-feed-header]').should('exist')
  })
})
