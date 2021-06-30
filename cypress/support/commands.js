import "cypress-localstorage-commands"

// -- Parent commands -- //

/**
 * Logs user in, using `j@n.com` by default but allowing us to pass in
another user at the call site if needed
 * We deliberately use `cy.request()` as Cypress recommends building up state
programmatically and not in the UI
 */
Cypress.Commands.add('login', (email = 'j@n.com', password = 'password') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/graphql',
    body: {
      operationName: 'loginUser',
      variables: { identifier: email, password: password },
      query:
        'mutation loginUser($identifier: String!, $password: String!) {\n  loginUser(identifier: $identifier, password: $password) {\n    ...UserFragment\n    __typename\n  }\n}\n\nfragment UserFragment on User {\n  id\n  name\n  handle\n  email\n  bio\n  userRole\n  profileImage\n  city\n  country\n  __typename\n}\n',
    },
  }).then((res) => {
    Cypress.log({
      name: 'Logged in',
      message: res.body,
    })
  })
})

Cypress.Commands.add(
  'signup',
  (handle = 'smartest_man_in_westeros_91', email = 'tyri@n.com', password = 'password') => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/graphql',
      body: {
        operationName:"createUser",
        variables: {
          handle,
          email,
          password,
        },
        query:
          "mutation createUser($handle: String!, $email: String!, $password: String!) {\n  createUser(handle: $handle, email: $email, password: $password) {\n    id\n    handle\n    email\n    __typename\n  }\n}\n"
      },
    }).then((res) => {
      Cypress.log({
        name: "Signed up",
        message: res.body
      })
    })
  },
)

//
// -- Child commands -- //
// example:
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- Dual commands -- //
// example:
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command -- //
// example:
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
