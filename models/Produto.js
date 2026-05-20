const mongoose = require('mongoose');


const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
      maxlength: [100, 'O nome não pode ter mais de 100 caracteres'],
    },
    descricao: {
      type: String,
      required: [true, 'A descrição do produto é obrigatória'],
      trim: true,
      maxlength: [500, 'A descrição não pode ter mais de 500 caracteres'],
    },
    preco: {
      type: Number,
      required: [true, 'O preço do produto é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
    quantidade: {
      type: Number,
      required: [true, 'A quantidade em estoque é obrigatória'],
      min: [0, 'A quantidade não pode ser negativa'],
      default: 0,
    },
    categoria: {
      type: String,
      required: [true, 'A categoria do produto é obrigatória'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produto', produtoSchema);
