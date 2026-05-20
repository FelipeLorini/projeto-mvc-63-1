#  Gestão de Produtos — MVC + MongoDB + HTML Puro

Aplicação web com **Node.js**, **Express** e **MongoDB (Mongoose)**, seguindo o padrão **MVC**.  
O front-end é feito em **HTML puro + JavaScript (fetch API)** — sem template engine.

---

##  Estrutura do Projeto

```
projeto-mvc-produtos/
├── config/
│   └── database.js              # Conexão com o MongoDB
├── controllers/
│   └── produtoController.js     # Lógica CRUD (retorna JSON)
├── middlewares/
│   ├── logRequisicao.js         # Log de todas as requisições HTTP
│   └── validarProduto.js        # Validação dos campos do produto
├── models/
│   └── Produto.js               # Schema Mongoose
├── routes/
│   └── produtoRoutes.js         # Endpoints REST /api/produtos
├── public/                      # Front-end estático (servido pelo Express)
│   ├── index.html               # Página inicial com estatísticas
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── produtos.js          # Listagem e exclusão
│   │   ├── novo.js              # Criação de produto
│   │   ├── detalhes.js          # Visualização de produto
│   │   └── editar.js            # Edição de produto
│   └── pages/
│       ├── produtos.html        # Listagem de produtos
│       ├── novo.html            # Formulário de criação
│       ├── detalhes.html        # Detalhes do produto
│       └── editar.html          # Formulário de edição
├── .env.example
├── .gitignore
├── package.json
└── server.js                    # Ponto de entrada
```

---

##  Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar o `.env`
```bash
cp .env.example .env
# Edite o .env com sua string de conexão do MongoDB Atlas
```

`.env`:
```
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/produtos_db
NODE_ENV=development
```

### 3. Iniciar
```bash
npm start       # produção
npm run dev     # desenvolvimento (nodemon)
```

Acesse: **http://localhost:3000**

---

##  Fluxo de uma Requisição

```
Browser (fetch)
     ↓
server.js  →  logRequisicao.js (Middleware: log)
     ↓
produtoRoutes.js  →  validarProduto.js (Middleware: validação, se POST/PUT)
     ↓
produtoController.js  (Lógica de negócio)
     ↓
Produto.js (Model Mongoose)
     ↓
MongoDB Atlas
     ↓
JSON → JavaScript (fetch) → Atualiza o HTML
```

---

##  Endpoints da API REST

| Método | Rota                | Descrição                   | Status |
|--------|---------------------|-----------------------------|--------|
| GET    | /api/produtos       | Lista todos os produtos     | 200    |
| GET    | /api/produtos/:id   | Busca produto por ID        | 200/404|
| POST   | /api/produtos       | Cria novo produto           | 201    |
| PUT    | /api/produtos/:id   | Atualiza produto            | 200/404|
| DELETE | /api/produtos/:id   | Exclui produto              | 200/404|

---

##  Segurança e Boas Práticas

- `.env` protege as credenciais do banco (nunca sobe ao GitHub)
- `.gitignore` exclui `node_modules/` e `.env`
- `try/catch` em todas as funções assíncronas do Controller
- Status codes corretos: 201, 200, 404, 422, 500
- Dois middlewares: **log de requisições** e **validação de campos**
