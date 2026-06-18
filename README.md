#  API Catálogo de Produtos

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

API REST desenvolvida em Node.js para gerenciamento de um catálogo de produtos.
Permite criar, listar, buscar, atualizar e excluir produtos de forma simples e organizada.
Projeto desenvolvido seguindo o padrão MVC com boas práticas de documentação.

## Demonstração


### Tela inicial

 ![Tela inicial](./img/print%20mvc.png)

 na tela inicial você consegue ir para os produtos criados, ela também te direciona para a tela de criar um novo produto, quantos produtos criados e o valor médio dos produtos.

 ### Lista de produtos

  ![Lista de produtos](./img/print%20lista%20de%20produtos.png)

Na lista de produtos você consegue ver quais produtos estão listados.

### Adicionar produtos

![adicionar produtos](./img/print%20adicionar%20produto.png)

Nesta tela você consegue criar novos produtos.


##  Stack Tecnológica

- **Node.js** — Ambiente de execução JavaScript
- **Express** — Framework para criação de rotas e servidor
- **MongoDB** — Banco de dados NoSQL
- **Mongoose** — ODM para modelagem de dados
- **Swagger** — Documentação interativa da API



##  Como Instalar e Rodar

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

**2. Entre na pasta do projeto:**
```bash
cd projeto-mvc-63-1-main
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Configure o arquivo `.env`:**
```bash
cp .env.example .env
```

**5. Rode o projeto:**
```bash
node server.js
'''



##  Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco



##  Documentação

Após rodar o projeto, acesse a documentação interativa em:

http://localhost:3000/api-docs
