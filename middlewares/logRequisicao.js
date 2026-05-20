
const logRequisicao = (req, res, next) => {
  const agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  console.log(`[${agora}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logRequisicao;
