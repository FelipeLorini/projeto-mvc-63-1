let produtos = [];

module.exports = {
    getAll: () => produtos,

    add: (produto) => {
        produto.id = Date.now();
        produtos.push(produto);
    },

    delete: (id) => {
        produtos = produtos.filter(p => p.id != id);
    },

    getById: (id) => produtos.find(p => p.id == id),

    update: (id, novo) => {
        let produto = produtos.find(p => p.id == id);
        if (produto) {
            produto.nome = novo.nome;
            produto.preco = novo.preco;
        }
    }
};
