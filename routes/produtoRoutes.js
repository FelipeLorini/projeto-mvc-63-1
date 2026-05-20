const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const validarProduto    = require('../middlewares/validarProduto');



router.get('/',      produtoController.listarProdutos);   
router.get('/:id',   produtoController.buscarProduto);    
router.post('/',     validarProduto, produtoController.criarProduto);    
router.put('/:id',   validarProduto, produtoController.atualizarProduto); 
router.delete('/:id',produtoController.excluirProduto);   

module.exports = router;
