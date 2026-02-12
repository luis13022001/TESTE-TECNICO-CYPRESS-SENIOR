import { elements as el} from './elements'
class  Menu{
    acessarMenuParcelas(){
        cy.get(el.menu_parcelas).click()
        cy.url().should('include', '/parcelas/painel')
    }
    acessarMenuParcelasVencidas(){
        cy.get(el.menu_parcelas_vencidas).click()
        cy.get('[data-cy=lista-parcelas]')
            .should('be.visible')
    }
    validarParcelasVencidas(){
        cy.get(el.parcela_vencida).each(($item) => {
            cy.wrap($item)
              .find('[data-cy=parcela-status]')
              .should('contain.text', 'Vencida')
          })
    }

}