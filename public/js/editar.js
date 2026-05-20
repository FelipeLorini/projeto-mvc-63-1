
document.querySelectorAll('.ano').forEach(el => el.textContent = new Date().getFullYear());

const params   = new URLSearchParams(window.location.search);
const id       = params.get('id');
const loading  = document.getElementById('loading');
const conteudo = document.getElementById('conteudo');
const alerta   = document.getElementById('alerta');

function mostrarAlerta(mensagem, tipo = 'erro') {
  alerta.textContent = mensagem;
  alerta.className = `alert alert-${tipo}`;
}

if (!id) window.location.href = '/pages/produtos.html';

async function carregarProduto() {
  try {
    const res  = await fetch(`/api/produtos/${id}`);
    const json = await res.json();

    loading.classList.add('hidden');

    if (!json.sucesso) {
      mostrarAlerta(json.mensagem || 'Produto não encontrado.');
      return;
    }

    const p = json.dados;

    document.getElementById('nome').value       = p.nome;
    document.getElementById('descricao').value  = p.descricao;
    document.getElementById('preco').value      = p.preco;
    document.getElementById('quantidade').value = p.quantidade;
    document.getElementById('categoria').value  = p.categoria;

    document.getElementById('btnVoltar').href   = `/pages/detalhes.html?id=${id}`;
    document.getElementById('btnCancelar').href = `/pages/detalhes.html?id=${id}`;

    conteudo.classList.remove('hidden');

  } catch {
    loading.classList.add('hidden');
    mostrarAlerta('Erro ao carregar o produto.');
  }
}

document.getElementById('formEditar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome:       document.getElementById('nome').value.trim(),
    descricao:  document.getElementById('descricao').value.trim(),
    preco:      document.getElementById('preco').value,
    quantidade: document.getElementById('quantidade').value,
    categoria:  document.getElementById('categoria').value.trim(),
  };

  const btnSubmit = e.target.querySelector('button[type="submit"]');
  btnSubmit.disabled    = true;
  btnSubmit.textContent = 'Atualizando...';

  try {
    const res  = await fetch(`/api/produtos/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(dados),
    });

    const json = await res.json();

    if (json.sucesso) {
      window.location.href = `/pages/detalhes.html?id=${id}`;
    } else {
      const msgs = json.erros ? json.erros.join(' | ') : json.mensagem;
      mostrarAlerta(msgs, 'erro');
    }
  } catch {
    mostrarAlerta('Erro de comunicação com o servidor.', 'erro');
  } finally {
    btnSubmit.disabled    = false;
    btnSubmit.textContent = 'Atualizar Produto';
  }
});

carregarProduto();
