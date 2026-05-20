const Produto = require('../models/Produto');


const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    res.status(200).json({ sucesso: true, total: produtos.length, dados: produtos });
  } catch (error) {
    console.error('Erro ao listar produtos:', error.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao listar produtos.' });
  }
};


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
