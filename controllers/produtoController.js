const Produto = require('../models/Produto');

/**
 * Lista todos os produtos cadastrados no banco.
 * @param {import('express').Request} req - Objeto da requisição
 * @param {import('express').Response} res - Objeto da resposta
 * @returns {Promise<void>} Lista de produtos em JSON
 */
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    res.status(200).json({ sucesso: true, total: produtos.length, dados: produtos });
  } catch (error) {
    console.error('Erro ao listar produtos:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao listar produtos.' });
  }
};

/**
 * Busca um produto pelo ID informado na URL.
 * @param {import('express').Request} req - Contém req.params.id com o ID do produto
 * @param {import('express').Response} res - Retorna o produto encontrado ou erro 404
 * @returns {Promise<void>}
 * @throws {Error} Se o ID for inválido ou ocorrer erro no banco
 */
const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ sucesso: true, dados: produto });
  } catch (error) {
    console.error('Erro ao buscar produto:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao buscar produto.' });
  }
};

/**
 * Cria um novo produto no banco de dados.
 * @param {import('express').Request} req - Contém no body: nome, descricao, preco, quantidade, categoria
 * @param {import('express').Response} res - Retorna o produto criado com status 201
 * @returns {Promise<void>}
 * @throws {Error} Se os dados forem inválidos ou obrigatórios estiverem faltando
 */
const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, categoria } = req.body;
    const produto = await Produto.create({ nome, descricao, preco, quantidade, categoria });

    res.status(201).json({ sucesso: true, dados: produto });
  } catch (error) {
    console.error('Erro ao criar produto:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao criar produto.' });
  }
};

/**
 * Atualiza os dados de um produto existente pelo ID.
 * @param {import('express').Request} req - Contém req.params.id e no body os campos a atualizar
 * @param {import('express').Response} res - Retorna o produto atualizado ou erro 404
 * @returns {Promise<void>}
 * @throws {Error} Se o ID for inválido ou os dados não passarem na validação
 */
const atualizarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, categoria } = req.body;

    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, preco, quantidade, categoria },
      { new: true, runValidators: true }
    );

    if (!produto) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ sucesso: true, dados: produto });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao atualizar produto.' });
  }
};

/**
 * Exclui um produto do banco de dados pelo ID.
 * @param {import('express').Request} req - Contém req.params.id com o ID do produto
 * @param {import('express').Response} res - Retorna mensagem de sucesso ou erro 404
 * @returns {Promise<void>}
 * @throws {Error} Se o ID for inválido ou ocorrer erro no banco
 */
const excluirProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);

    if (!produto) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ sucesso: true, mensagem: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao excluir produto.' });
  }
};

module.exports = { listarProdutos, buscarProduto, criarProduto, atualizarProduto, excluirProduto };
