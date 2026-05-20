require('dotenv').config();

const express  = require('express');
const path     = require('path');

const conectarBancoDeDados = require('./config/database');
const logRequisicao        = require('./middlewares/logRequisicao');
const produtoRoutes        = require('./routes/produtoRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;


conectarBancoDeDados();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logRequisicao);

app.use('/api/produtos', produtoRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(` Servidor em http://localhost:${PORT}`);
  console.log(` Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
