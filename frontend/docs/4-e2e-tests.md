# E2E Tests with Cypress

Journaly uses [Cypress](https://www.cypress.io/) for end-to-end testing. The docs are full of great information, so it's encouraged to read through the [Core Concepts](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes) before jumping into writing your first tests.

If you're curious about how Cypress is different from other e2e frameworks and web drivers like Selenium, check out [Why Cypress?](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) and [Key Differences](https://docs.cypress.io/guides/overview/key-differences.html#Architecture).

## Best Practices

We also try to follow Cypress [Best Practices](https://docs.cypress.io/guides/references/best-practices.html). Here are a few important ones.

### Use `data-test` attributes for selecting elements

This is the best choice in selecting elements because querying by class
names, HTML attributes, or text can cause tests to fail if any of those
values change.

```js
cy.get('[data-test=submit]').click()
```

If, on the other hand, you want the test to fail if the _text_ of the element changes, then use `cy.contains()`. For example, if your submit button can say either `Submit` or `Save`, and the test should pass or fail based on that text, it is better to use `cy.contains('Submit')` or `cy.contains('Save')`.

### Prefer longer tests with more assertions

A best practice with unit tests is to have small tests that test one thing. For integration and end-to-end tests though, there is a cost in resetting the entire application state in the browser. For Cypress, it's common to have tests with tens of commands. If one of the assertions fails, Cypress will always display which assertion failed and why.

### Server responses vs mocked API responses

Cypress' suggested approach is to use [real server responses](https://docs.cypress.io/guides/guides/network-requests.html#Use-Server-Responses) sparingly and for critical paths of the app. It's also helpful to have one true e2e test for the "happy path" of any given feature.

Since full e2e tests with real server responses require a DB, are slower, and are harder to test edge cases, most of the Cypress tests you write should have [stubbed API responses](https://docs.cypress.io/guides/guides/network-requests.html#Stub-Responses). Stubbed API responses are great because they allow you to change the body, status, or headers of an HTTP response. They are also extremely fast, which helps bring down the overall time it takes to run the app's full e2e test suite.

## Running Cypress

To start Cypress locally, first start the servers from the root with `npm run dev`. Since Cypress is running in a real browser, it needs the app server to also be running. After you start the server, run `npm run cypress:open` to open up the Cypress application. Here, you can choose a browser, currently Chrome, Edge, Electron, and Firefox (beta). You can also click `Run all specs` or choose a specific test to run, e.g. `login.spec.js`.

## Debugging

If your tests are failing locally, first see if you can tell what's going wrong by watching the test run itself. You can also try adding a `debugger` or `cy.pause()` - check out the [Debugging](https://docs.cypress.io/guides/guides/debugging.html#Using-debugger) article for more information.

Additionally, you can try running your tests in a different browser or in "headless" mode. To do so, run `npx cypress run --browser chrome --headless`. The [Command Line](https://docs.cypress.io/guides/guides/command-line.html#Commands) docs show the full list of options.
