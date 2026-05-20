
const validarProduto = (req, res, next) => {
  const { nome, descricao, preco, quantidade, categoria } = req.body;
  const erros = [];

  if (!nome || nome.trim() === '')        erros.push('O campo "nome" é obrigatório.');
  if (!descricao || descricao.trim() === '') erros.push('O campo "descrição" é obrigatório.');
  if (preco === undefined || preco === '') erros.push('O campo "preço" é obrigatório.');
  if (quantidade === undefined || quantidade === '') erros.push('O campo "quantidade" é obrigatório.');
  if (!categoria || categoria.trim() === '') erros.push('O campo "categoria" é obrigatório.');

  if (erros.length > 0) {
    return res.status(422).json({ sucesso: false, erros });
  }

  next();
};

module.exports = validarProduto;
