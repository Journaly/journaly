describe('User signs up', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('Form requires handle', () => {
    cy.get('[data-testid=signup-button]').click()
    cy.contains('p', 'emailRequiredErrorMessage').should('exist')
  })

  it('Form requires email address', () => {
    cy.get('[data-testid=signup-button]').click()
    cy.contains('p', 'emailRequiredErrorMessage').should('exist')
  })

  it('Form enforces valid email address', () => {
    cy.get('[data-testid=email]').type('validemail.com')
    cy.get('[data-testid=signup-button]').click()
    cy.contains('p', 'emailRequiredErrorMessage').should('exist')
  })

  it('Form requires password', () => {
    cy.get('[data-testid=signup-button]').click()
    cy.contains('p', 'passwordRequiredErrorMessage').should('exist')
  })

  it('Form requires valid password', () => {
    cy.get('[data-testid=email]').type('valid@email.com')
    cy.get('[data-testid=password]').type('12{enter}')
    cy.contains('p', 'passwordMinimumErrorMessage')
  })

  it('User successfully signs up and is redirected "My Feed" page with welcome modal', () => {
    cy.get('[data-testid=email]').type('j@n.com')
    cy.get('[data-testid=password]').type('password{enter}')
    cy.url().should('include', '/my-feed')
    cy.get('[data-testid=welcome-modal]').should('exist')
  })
})
