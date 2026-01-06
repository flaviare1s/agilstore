# AgilStore - Sistema de Gerenciamento de Inventário

[![English](https://img.shields.io/badge/Read%20in-English-blue)](README_EN.md)

Sistema de gerenciamento de inventário desenvolvido para a AgilStore, uma loja de eletrônicos que precisa controlar seu catálogo de produtos de forma eficiente e automatizada.

## 📋 Descrição

A AgilStore expandiu seu catálogo de produtos para incluir smartphones, laptops, cabos, carregadores e fones de ouvido. Com o aumento do inventário, surgiu a necessidade de substituir o controle manual em planilhas por uma aplicação automatizada.

Esta aplicação permite:

- ✅ Adicionar novos produtos ao inventário
- ✅ Listar todos os produtos cadastrados
- ✅ Buscar produtos por ID ou nome
- ✅ Atualizar informações de produtos existentes
- ✅ Excluir produtos do inventário
- ✅ Filtrar produtos por categoria
- ✅ Ordenar produtos por nome, quantidade ou preço
- ✅ Persistência automática de dados em arquivo JSON

## 🚀 Tecnologias Utilizadas

- **Node.js** - Plataforma de desenvolvimento
- **Módulos Nativos**:
  - `fs` - Para persistência de dados em arquivo JSON
  - `readline` - Para interação via terminal

**Nenhuma biblioteca externa é necessária!** A aplicação foi desenvolvida usando apenas recursos nativos do Node.js.

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- Sistema operacional: Windows, Linux ou macOS

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/flaviare1s/agilstore.git
```

2. Entre no diretório do projeto:

```bash
cd agilstore
```

3. Não é necessário instalar dependências, pois a aplicação usa apenas módulos nativos do Node.js!

## ▶️ Como Executar

Execute o comando:

```bash
node index.js
```

Ou diretamente com Node:

```bash
node index.js
```

## 📖 Como Usar

### Menu Principal

Ao iniciar a aplicação, você verá o menu principal com as seguintes opções:

```
╔════════════════════════════════════════════╗
║      AGILSTORE - GESTÃO DE INVENTÁRIO      ║
╠════════════════════════════════════════════╣
║  1. Adicionar Produto                      ║
║  2. Listar Produtos                        ║
║  3. Buscar Produto                         ║
║  4. Atualizar Produto                      ║
║  5. Excluir Produto                        ║
║  0. Sair                                   ║
╚════════════════════════════════════════════╝
```

### 1. Adicionar Produto

Permite adicionar um novo produto ao inventário. Você precisará fornecer:

- Nome do Produto
- Categoria
- Quantidade em Estoque
- Preço

O ID é gerado automaticamente pelo sistema.

**Exemplo:**

```
Nome do Produto: iPhone 15 Pro
Categoria: Smartphones
Quantidade em Estoque: 10
Preço (R$): 7999.00
```

### 2. Listar Produtos

Exibe todos os produtos cadastrados em formato de tabela. Opções disponíveis:

- Listar todos os produtos
- Filtrar por categoria específica
- Ordenar por nome, quantidade ou preço

**Exemplo de listagem:**

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                          INVENTÁRIO AGILSTORE                                  │
├─────┬──────────────────────┬──────────────────┬────────────┬───────────────────┤
│ ID  │ Nome do Produto      │ Categoria        │ Quantidade │ Preço (R$)        │
├─────┼──────────────────────┼──────────────────┼────────────┼───────────────────┤
│ 1   │ iPhone 15 Pro        │ Smartphones      │         10 │           7999.00 │
│ 2   │ MacBook Pro M3       │ Laptops          │          5 │          12999.00 │
└─────┴──────────────────────┴──────────────────┴────────────┴───────────────────┘
```

### 3. Buscar Produto

Permite buscar produtos de duas formas:

- **Por ID**: Busca exata pelo identificador único
- **Por Nome**: Busca por parte do nome (busca parcial)

**Exemplo:**

```
Buscar por Nome
Digite o nome (ou parte dele): iPhone

✓ Encontrado(s) 1 produto(s):

╔════════════════════════════════════════════╗
║        DETALHES DO PRODUTO                 ║
╠════════════════════════════════════════════╣
║ ID:         1                              ║
║ Nome:       iPhone 15 Pro                  ║
║ Categoria:  Smartphones                    ║
║ Quantidade: 10                             ║
║ Preço:      R$ 7999.00                     ║
╚════════════════════════════════════════════╝
```

### 4. Atualizar Produto

Atualiza as informações de um produto existente. Você pode:

- Alterar o nome
- Mudar a categoria
- Atualizar a quantidade em estoque
- Modificar o preço

Deixe em branco para manter o valor atual.

**Exemplo:**

```
Digite o ID do produto: 1

Produto atual:
[Detalhes do produto são exibidos]

Deixe em branco para manter o valor atual.

Nome [iPhone 15 Pro]:
Categoria [Smartphones]:
Quantidade [10]: 8
Preço [7999.00]: 7499.00

✓ Produto ID 1 atualizado com sucesso!
```

### 5. Excluir Produto

Remove um produto do inventário. O sistema solicita confirmação antes de excluir.

**Exemplo:**

```
Digite o ID do produto: 2

Produto a ser excluído:
[Detalhes do produto são exibidos]

Tem certeza que deseja excluir? (S/N): S

✓ Produto "MacBook Pro M3" (ID: 2) removido com sucesso!
```

## 💾 Persistência de Dados

Os dados são salvos automaticamente em um arquivo chamado `produtos.json` na raiz do projeto. Este arquivo é criado automaticamente quando você adiciona o primeiro produto.

**Estrutura do arquivo:**

```json
{
  "produtos": [
    {
      "id": 1,
      "nome": "iPhone 15 Pro",
      "categoria": "Smartphones",
      "quantidade": 10,
      "preco": 7999.0
    }
  ],
  "proximoId": 2
}
```

Os dados são:

- ✅ Carregados automaticamente ao iniciar a aplicação
- ✅ Salvos automaticamente após cada operação (adicionar, atualizar, excluir)
- ✅ Preservados entre execuções da aplicação

## 📁 Estrutura do Projeto

```
agilstore/
├── index.js          # Arquivo principal da aplicação
├── package.json      # Configurações do projeto
├── produtos.json     # Dados do inventário (criado automaticamente)
└── README.md         # Documentação
```

## ✨ Funcionalidades Implementadas

### Requisitos Funcionais

- ✅ Adicionar Produto com ID único automático
- ✅ Listar Produtos em formato de tabela
- ✅ Atualizar Produto com validação de ID
- ✅ Excluir Produto com confirmação
- ✅ Buscar Produto por ID ou nome

### Requisitos Extras

- ✅ Persistência de dados em JSON
- ✅ Filtro por categoria
- ✅ Ordenação por nome, quantidade ou preço
- ✅ Interface visual aprimorada com caracteres especiais
- ✅ Validações de entrada de dados
- ✅ Mensagens de sucesso e erro claras

## 🎯 Exemplos de Uso

### Cenário 1: Adicionar produtos variados

```
1. Adicionar iPhone 15 Pro - Smartphones - 10 unidades - R$ 7999,00
2. Adicionar MacBook Pro M3 - Laptops - 5 unidades - R$ 12999,00
3. Adicionar Cabo USB-C - Acessórios - 50 unidades - R$ 49,90
4. Adicionar Fone Bluetooth - Acessórios - 25 unidades - R$ 299,00
```

### Cenário 2: Filtrar por categoria

```
Listar Produtos > Filtrar por categoria > "Acessórios"
Resultado: Exibe apenas Cabo USB-C e Fone Bluetooth
```

### Cenário 3: Ordenar por preço

```
Listar Produtos > Ordenar produtos > Preço
Resultado: Produtos listados do mais barato ao mais caro
```

### Cenário 4: Atualizar estoque

```
Atualizar Produto > ID 1 > Quantidade: 8
Resultado: Estoque do iPhone reduzido de 10 para 8 unidades
```

## 🛠️ Validações Implementadas

- Nome do produto não pode ser vazio
- Categoria não pode ser vazia
- Quantidade deve ser um número inteiro positivo
- Preço deve ser um número positivo
- ID do produto deve existir para atualização/exclusão
- Confirmação obrigatória para exclusão de produtos

## 📝 Observações

- A aplicação foi desenvolvida pensando em facilidade de uso e manutenção
- Interface intuitiva com menus claros e organizados
- Todas as operações fornecem feedback visual imediato
- Dados são preservados entre execuções
- Não requer conexão com banco de dados
- Código limpo e bem documentado

## 👨‍💻 Autor

Flavia Reis
