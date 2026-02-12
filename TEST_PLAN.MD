





PARTE 2 — BDD (Gherkin)
Funcionalidade: Painel de Parcelas
🟢 Cenário 1 — Cenário Feliz

Cenário: Exibir parcelas separadas por status no painel
Dado que estou autenticado como usuário da empresa "Empresa A"
E existem parcelas vencidas, a vencer e pagas cadastradas para "Empresa A"
Quando acesso o Painel de Parcelas
Então devo visualizar as seções "Vencidas", "A vencer" e "Pagas"
E cada parcela deve aparecer na seção correspondente ao seu status

🟢 Cenário 2 — Validação de Filtros

Cenário: Filtrar parcelas por período selecionado
Dado que estou autenticado como usuário da empresa "Empresa A"
E existem parcelas em diferentes datas para "Empresa A"
Quando aplico o filtro de "01/01/2026" até "31/01/2026"
Então devo visualizar apenas parcelas dentro do período informado

🔴 Cenário 3 — Cenário de Erro

Cenário: Exibir erro ao informar período inválido no filtro
Dado que estou autenticado como usuário da empresa "Empresa A"
Quando informo data inicial "31/01/2026" e data final "01/01/2026"
Então devo ver uma mensagem de erro de período inválido
E o filtro não deve ser aplicado

🟡 Cenário 4 — Regra de Negócio

Cenário: Parcela paga no passado deve permanecer na seção Pagas
Dado que estou autenticado como usuário da empresa "Empresa A"
E existe uma parcela com vencimento em "05/01/2026" e status "PAGA"
Quando acesso o Painel de Parcelas
Então devo ver essa parcela na seção "Pagas"
E não devo vê-la na seção "Vencidas"