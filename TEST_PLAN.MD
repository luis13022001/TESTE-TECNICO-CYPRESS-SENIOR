## PARTE 1 — Análise e Estratégia de Testes

---

### Testes Funcionais (UI — Web e Mobile)

- Acesso ao painel  
- Exibição correta das seções:
  - Vencidas
  - A vencer
  - Pagas
- Aplicação do filtro por período  
- Estados da tela:
  - Loading
  - Empty state (sem resultados)
  - Mensagens de erro
- Conferência básica de dados exibidos (status, data, valor)

---

### Testes de Integração (UI ↔ API)

- Verificar se o painel consome o endpoint correto  
- Validar envio correto de parâmetros (status e período)  
- Conferir se a listagem exibida corresponde ao retorno da API  

---

### Testes de API / Contrato

- Status code correto:
  - 200 (sucesso)
  - 401 (não autenticado)
  - 403 (sem permissão)
- Validação de campos obrigatórios (id, status, vencimento, valor, etc.)  
- Filtro por status funcionando corretamente  
- Filtro por período retornando apenas registros dentro do intervalo  
- Paginação e ordenação (se aplicável)  

---

### Testes de Regra de Negócio

Classificação correta das parcelas:

- Vencida → vencimento < hoje e não paga  
- A vencer → vencimento >= hoje e não paga  
- Paga → status igual a paga  

Casos de borda:

- Data igual a “hoje”  
- Data “ontem” e “amanhã”  
- Validação de timezone do ambiente  

---

### Regressão Seletiva
.
Funcionalidades impactadas:

- Login  
- Criação de lançamentos  
- Parcelamento de lançamentos  
- Listagem antiga de parcelas  

Objetivo: garantir que o novo painel não quebre funcionalidades já existentes.

---

### Teste Exploratório (Manual)

- Combinações de datas  
- Usuário sem parcelas  
- Volume maior de registros  
- Parcelamento recém-criado refletindo corretamente no painel  

---

### Validação de Performance (Básica)

- Tempo de resposta do endpoint de parcelas  
- Tempo de carregamento do painel com volume elevado  
- Identificação de possíveis gargalos evidentes  

---

## 2. O que Automatizar vs. Manual

### Automatizar (Prioridade Alta)

**API Tests**
- Filtro por status  
- Filtro por período  
- Validação de schema  
- Autorização  

**Integração UI ↔ API**
- Verificar parâmetros enviados  
- Conferir consistência entre API e UI  

**E2E (Cypress) — Smoke**
- Login  
- Acesso ao painel  
- Validação da listagem de vencidas  
- Aplicação de filtro básico  

---

### Manter Manual

- Avaliação visual (layout e responsividade)  
- Testes exploratórios  
- Compatibilidade mínima (2 browsers + 2 dispositivos)  
- Cenários raros ou complexos de automatizar  

---

## 3. Pirâmide de Testes

### Base (Maior Volume)

- Testes Unit / Component  
- Validação de regras de classificação  
- Contratos básicos da API  

**Motivo:** testes rápidos, estáveis e com maior cobertura de regra de negócio.

---

### Meio (Alto Valor)

- Testes de API  
- Testes de Integração  

**Motivo:** garantem que o backend entrega corretamente os dados esperados.

---

### Topo (Menor Volume)

- Testes E2E (UI Web e Mobile)  
- Apenas fluxos críticos  

**Motivo:** reduzir flakiness e manter estabilidade da suíte automatizada.

---

## Conclusão

A estratégia prioriza:

- Validação sólida de regras de negócio  
- Forte cobertura em API e integração  
- Poucos E2E bem selecionados  
- Complemento com testes manuais exploratórios  

Essa abordagem garante qualidade, estabilidade e manutenção sustentável da suíte de testes ao longo do 



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


## PARTE 3 — Casos de Teste Estruturados (2 cenários)

---

### Caso de Teste 01 — Filtrar parcelas por período selecionado (BDD Cenário 2)

**Pré-condição:**
- Usuário autenticado com permissão para acessar o Painel de Parcelas.
- Existem parcelas cadastradas para a empresa em datas diferentes, por exemplo:
  - Parcela A com vencimento em **10/01/2026** (dentro do período)
  - Parcela B com vencimento em **10/02/2026** (fora do período)

**Passos:**
1. Acessar o **Painel de Parcelas**.
2. Informar **Data inicial** = `01/01/2026`.
3. Informar **Data final** = `31/01/2026`.
4. Clicar no botão **Aplicar filtro**.

**Resultado esperado:**
- Exibir somente parcelas dentro do intervalo **01/01/2026 a 31/01/2026**.
- Não exibir parcelas fora do período (ex.: vencimento em **10/02/2026**).
- As parcelas exibidas devem permanecer corretamente classificadas (Vencidas/ A vencer/ Pagas) conforme seus dados.

---

### Caso de Teste 02 — Bloquear acesso ao painel para usuário sem permissão (BDD Cenário 5)

**Pré-condição:**
- Usuário autenticado **sem permissão** para visualizar o Painel de Parcelas (perfil/role sem acesso).

**Passos:**
1. Realizar login com um usuário **sem permissão**.
2. Tentar acessar o Painel de Parcelas pelo **menu**.
3. (Se aplicável) Tentar acessar o Painel de Parcelas pela **URL/rota direta**.

**Resultado esperado:**
- O sistema deve impedir o acesso ao Painel de Parcelas.
- Exibir mensagem de **"Acesso negado"** (ou comportamento equivalente definido).
- Nenhuma informação de parcelas deve ser exibida (nem parcialmente).