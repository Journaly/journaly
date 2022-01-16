describe('Inline Feedback Comments', () => {
  beforeEach(() => {
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/post/1')
  })
  it('User leaves comment', () => {
    // TODO: Write test
  })
  it('User edits comment', () => {
    // TODO: Write test
  })
  it('User deletes comment', () => {
    // TODO: Write test
  })
  it('User adds comment to thread', () => {
    // TODO: Write test
  })
})

describe('Post Comments', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.login()
    cy.setLocalStorage('welcome-modal-july-2020', 'seen')
    cy.visit('/post/1')
  })
  it('User leaves comment', () => {
    // TODO: Write test
  })
  it('User edits comment', () => {
    // TODO: Write test
  })
  it('User deletes comment', () => {
    // TODO: Write test
  })
})
