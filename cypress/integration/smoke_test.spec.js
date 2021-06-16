describe('Checks the site is up', () => {
  it('Visits landing page and makes sure site loads', () => {
    cy.visit('/')
    cy.get('[data-testid=landing-elevator-pitch]')
      .should('exist')
  })
})

describe('Checks user can log in', () => {
  it('logs in successfully and loads feed', () => {
    cy.visit('/dashboard/login')
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-header]')
      .should('exist')
  })
})

describe('Runs the app and checks all core functionality for loggedd in user', () => {
  beforeEach(() => {
    // cy.intercept('http://localhost:3000/api/graphql', {
    //   fixture: 'login',
    // })
    cy.visit('/dashboard/login')
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
  })
  it('Visits the My Feed page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-header]')
      .should('exist')
  })
  it('Loads a post', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-feed-post-card]')
      .first()
      .then(($post) => {
        const postUrl = $post.attr("href")
        cy.get('[data-testid=my-feed-post-card]')
          .first()
          .click()
        cy.url().should('include', postUrl)
      })
  })
  it('Navigates to the My Posts page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=my-posts-nav-link]')
      .click()
    cy.get('[data-testid=my-posts-header]')
  })
  it('Navigates to the Settings page', () => {
    cy.visit('/dashboard/my-feed')
    cy.get('[data-testid=settings-nav-link]')
      .click()
    cy.get('[data-testid=settiings-breadcrumbs]')
  })
})

describe('Runs app and checks sign up functionality', () => {
  // cy.visit('/dashboard/signup')
  // cy.signup()
})
