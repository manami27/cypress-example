// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validLogin', (username, password) => {
  cy.contains('Email').type(username)
  cy.get('#auth-login-v2-password').type(password, {
    log: false,
  })
  cy.get('.MuiButton-root').click()
  if (username === '{backspace}') {
    cy.contains('email is a required field').should('be.visible')
  } else if (password === '{backspace}') {
    cy.contains('password is a required field').should('be.visible')
  } else {
    cy.location('pathname').should('include', '/home')
    cy.get('.MuiAvatar-img').should('be.visible')
  }
})

Cypress.Commands.add('loginUsingAPI', (email, password) => {
  // Send request to the KPrime API login endpoint
  const apiUrl = Cypress.config('apiUrl')
  cy.request({
    method: 'POST',
    url: apiUrl + '/api/v1/auth/login',
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.success).to.eql(true)
    expect(response.body.message).to.eql('Authorized')
  })
})

Cypress.Commands.add('invalidLogin', (username, password) => {
  cy.contains('Email').type(username)
  cy.get('#auth-login-v2-password').type(password, {
    log: false,
  })
  cy.get('.MuiButton-root').click()
  cy.contains('Email or Password is invalid').should('be.visible')
})

Cypress.Commands.add('invalidEmail', (username, password) => {
  cy.contains('Email').type(username)
  cy.get('#auth-login-v2-password').type(password, {
    log: false,
  })
  cy.get('.MuiButton-root').click()
  cy.contains('email must be a valid email').should('be.visible')
})

Cypress.Commands.add('logout', () => {
  cy.get('.actions-right').click()
  cy.get('.css-ov0zs5').click({ force: true })
  cy.location('pathname').should('include', '/login')
})
