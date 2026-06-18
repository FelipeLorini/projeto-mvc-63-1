const mongoose = require('mongoose');

/**
 * Schema do produto no banco de dados MongoDB.
 * Define os campos, tipos e validações de cada produto.
 */
const produtoSchema = new mongoose.Schema(
  {
    /** Nome do produto */
    nome: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
      maxlength: [100, 'O nome não pode ter mais de 100 caracteres'],
    },
    /** Descrição detalhada do produto */
    descricao: {
      type: String,
      required: [true, 'A descrição do produto é obrigatória'],
      trim: true,
      maxlength: [500, 'A descrição não pode ter mais de 500 caracteres'],
    },
    /** Preço do produto (não pode ser negativo) */
    preco: {
      type: Number,
      required: [true, 'O preço do produto é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
    /** Quantidade em estoque (padrão: 0) */
    quantidade: {
      type: Number,
      required: [true, 'A quantidade em estoque é obrigatória'],
      min: [0, 'A quantidade não pode ser negativa'],
      default: 0,
    },
    /** Categoria do produto */
    categoria: {
      type: String,
      required: [true, 'A categoria do produto é obrigatória'],
      trim: true,
    },
  },
  { timestamps: true }
);

/**
 * Model Produto gerado a partir do schema.
 * Usar para criar, buscar, atualizar e deletar produtos no banco.
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('Produto', produtoSchema);
