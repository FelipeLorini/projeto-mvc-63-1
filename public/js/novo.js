
document.querySelectorAll('.ano').forEach(el => el.textContent = new Date().getFullYear());

const form     = document.getElementById('formProduto');
const alerta   = document.getElementById('alerta');
const btnSalvar = document.getElementById('btnSalvar');

function mostrarAlerta(mensagem, tipo = 'sucesso') {
  alerta.textContent = mensagem;
  alerta.className = `alert alert-${tipo}`;
}

function esconderAlerta() {
  alerta.className = 'alert hidden';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  esconderAlerta();

  const dados = {
    nome:       document.getElementById('nome').value.trim(),
    descricao:  document.getElementById('descricao').value.trim(),
    preco:      document.getElementById('preco').value,
    quantidade: document.getElementById('quantidade').value,
    categoria:  document.getElementById('categoria').value.trim(),
  };

  btnSalvar.disabled = true;
  btnSalvar.textContent = 'Salvando...';

  try {
    const res  = await fetch('/api/produtos', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(dados),
    });

    const json = await res.json();

    if (json.sucesso) {
      window.location.href = '/pages/produtos.html';
    } else {
      const msgs = json.erros ? json.erros.join(' | ') : json.mensagem;
      mostrarAlerta(msgs, 'erro');
    }
  } catch {
    mostrarAlerta('Erro de comunicação com o servidor.', 'erro');
  } finally {
    btnSalvar.disabled = false;
    btnSalvar.textContent = 'Salvar Produto';
  }
});
