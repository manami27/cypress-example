/// <reference types="cypress" />

describe('Login Authentication', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear())
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/login')
  })

  it('AC-OP-01: Displays All Orders', () => {
    cy.fixture('loginData.json').then((user) => {
      cy.validLogin(user.validUser.username, user.validUser.password)
      cy.wait(1000)
      cy.get('.css-14wop6h').click()
      cy.get('.css-1dqc8eu > .MuiTypography-root').click()
      cy.get(
        '.MuiCollapse-wrapperInner > :nth-child(1) > .MuiListItemButton-root > .MuiBox-root > .MuiTypography-root',
      ).click()
      cy.location('pathname').should('include', '/accounting/order')
      cy.get(
        '[data-id="64d457ff3dd2a4655b49f126"] > [data-field="instrumentName"]',
      )
    })
  })
})
