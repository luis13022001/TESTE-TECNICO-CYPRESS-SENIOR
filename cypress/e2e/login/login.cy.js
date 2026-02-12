import Login from '../pages/login'
import Menu from '../pages/menu'

describe('Painel de Parcelas - Validação de parcelas vencidas', () => {

  it('Deve realizar login, acessar o painel e validar listagem de parcelas vencidas', () => {
    Login.visitarPagina()
    Login.realizarLogin()
    Menu.acessarMenuParcelas()
    Menu.acessarMenuParcelasVencidas()
    Menu.validarParcelasVencidas()
    cy.screenshot('painel-parcelas-vencidas')

  })

})