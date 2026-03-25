const express = require('express');
const path = require('path');
const app = express();

const controller = require('./controllers/usercontroller');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', controller.home);
app.get('/sobre', controller.sobre);
app.get('/contato', controller.contato);
app.get('/crud', controller.crud);

app.post('/add', controller.addProduto);
app.get('/delete/:id', controller.deleteProduto);
app.get('/edit/:id', controller.editPage);
app.post('/update/:id', controller.updateProduto);

app.listen(3000, () => {
    console.log('Rodando em http://localhost:3000');
});
