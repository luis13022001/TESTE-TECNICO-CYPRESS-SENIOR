## PARTE 2 — BDD (Gherkin)

Funcionalidade: Painel de Parcelas

```
Funcionalidade: Painel de Parcelas

  Cenário: Exibir parcelas separadas por status no painel
    Dado que estou autenticado como usuário da empresa "Empresa A"
    E existem parcelas vencidas, a vencer e pagas cadastradas para "Empresa A"
    Quando acesso o Painel de Parcelas
    Então devo visualizar as seções "Vencidas", "A vencer" e "Pagas"
    E cada parcela deve aparecer na seção correspondente ao seu status

  Cenário: Filtrar parcelas por período selecionado
    Dado que estou autenticado como usuário da empresa "Empresa A"
    E existem parcelas em diferentes datas para "Empresa A"
    Quando aplico o filtro de "01/01/2026" até "31/01/2026"
    Então devo visualizar apenas parcelas dentro do período informado

  Cenário: Exibir erro ao informar período inválido no filtro
    Dado que estou autenticado como usuário da empresa "Empresa A"
    Quando informo data inicial "31/01/2026" e data final "01/01/2026"
    Então devo ver uma mensagem de erro de período inválido
    E o filtro não deve ser aplicado

  Cenário: Parcela paga no passado deve permanecer na seção Pagas
    Dado que estou autenticado como usuário da empresa "Empresa A"
    E existe uma parcela com vencimento em "05/01/2026" e status "PAGA"
    Quando acesso o Painel de Parcelas
    Então devo ver essa parcela na seção "Pagas"
    E não devo vê-la na seção "Vencidas"

  Cenário: Bloquear acesso ao painel para usuário sem permissão
    Dado que estou autenticado como usuário sem permissão de visualizar parcelas
    Quando tento acessar o Painel de Parcelas
    Então devo ver mensagem de "Acesso negado"
    E não devo visualizar dados de parcelas
```