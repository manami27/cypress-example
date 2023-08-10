/// <reference types="cypress" />

describe('Login Authentication', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear())
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/login')
  })

  it('AC-LGN-01 : Login with correct email and password', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.validUser.username, user.validUser.password)
    })
  })

  it('AC-LGN-02 : Login with incorrect email or password', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.invalidLogin(user.invalidUser.username, user.invalidUser.password)
    })
  })

  it('AC-LGN-03 : Login with invalid email format', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.invalidEmail(user.invalidEmail.username, user.invalidEmail.password)
    })
  })

  it('AC-LGN-04 : Login with empty email', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.emptyEmail.username, user.emptyEmail.password)
    })
  })

  it('AC-LGN-05 : Login with empty password', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.emptyPassword.username, user.emptyPassword.password)
    })
  })
})
