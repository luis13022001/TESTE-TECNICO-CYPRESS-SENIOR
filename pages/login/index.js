import { elements as el} from './elements'

class Login{
    visitarPagina() {
    cy.visit('/')
    }
    realizarLogin() {
    cy.get(el.email)
      .should('be.visible')
      .type(Cypress.env('USER_EMAIL'))

    cy.get(el.password)
      .should('be.visible')
      .type(Cypress.env('USER_PASSWORD'), { log: false })

    cy.get(el.LoginButton).click()
    cy.url().should('include', '/dashboard')
    }
}