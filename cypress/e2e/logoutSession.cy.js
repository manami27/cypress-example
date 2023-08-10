/// <reference types="cypress" />

describe('Logout Session', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear())
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/login')
  })

  it('AC-LGT-01 : Manually Logout', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.validUser.username, user.validUser.password)
      cy.wait(10)
      cy.logout()
    })
  })

  it('AC-LGT-03 : Logout session when account has been used by another user', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.validUser.username, user.validUser.password)
      cy.wait(10)
      cy.loginUsingAPI(user.validUserAPI.email, user.validUserAPI.password)
      cy.reload()
      cy.get('.go318386747').should('be.visible')
      cy.contains('This account has been used by another user!').should(
        'be.visible',
      )
      const apiUrl = Cypress.config('apiUrl')
      cy.request({
        method: 'GET',
        url: apiUrl + '/api/v1/auth/me',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Unauthorized')
      })
    })
  })
})
