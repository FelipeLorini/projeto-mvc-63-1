const model = require('../models/usermodel');

exports.home = (req, res) => res.render('home');
exports.sobre = (req, res) => res.render('sobre');
exports.contato = (req, res) => res.render('contato');

exports.crud = (req, res) => {
    res.render('crud', { produtos: model.getAll(), edit: null });
};

exports.addProduto = (req, res) => {
    model.add(req.body);
    res.redirect('/crud');
};

exports.deleteProduto = (req, res) => {
    model.delete(req.params.id);
    res.redirect('/crud');
};

exports.editPage = (req, res) => {
    res.render('crud', {
        produtos: model.getAll(),
        edit: model.getById(req.params.id)
    });
};

exports.updateProduto = (req, res) => {
    model.update(req.params.id, req.body);
    res.redirect('/crud');
};
