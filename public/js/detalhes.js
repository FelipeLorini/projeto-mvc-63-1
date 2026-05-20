
document.querySelectorAll('.ano').forEach(el => el.textContent = new Date().getFullYear());

const params  = new URLSearchParams(window.location.search);
const id      = params.get('id');
const loading = document.getElementById('loading');
const conteudo = document.getElementById('conteudo');
const alerta  = document.getElementById('alerta');

function mostrarAlerta(mensagem, tipo = 'erro') {
  alerta.textContent = mensagem;
  alerta.className = `alert alert-${tipo}`;
}

if (!id) {
  window.location.href = '/pages/produtos.html';
}

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

    document.getElementById('tituloProduto').textContent = p.nome;
    document.getElementById('dDescricao').textContent    = p.descricao;
    document.getElementById('dCategoria').textContent    = p.categoria;
    document.getElementById('dPreco').textContent        = `R$ ${Number(p.preco).toFixed(2).replace('.', ',')}`;
    document.getElementById('dQuantidade').textContent   = `${p.quantidade} unidade(s)`;
    document.getElementById('dCriado').textContent       = new Date(p.createdAt).toLocaleString('pt-BR');
    document.getElementById('dAtualizado').textContent   = new Date(p.updatedAt).toLocaleString('pt-BR');
    document.getElementById('dId').textContent           = p._id;
    document.getElementById('btnEditar').href            = `/pages/editar.html?id=${p._id}`;

    conteudo.classList.remove('hidden');

  } catch {
    loading.classList.add('hidden');
    mostrarAlerta('Erro ao carregar o produto. Verifique o servidor.');
  }
}

document.getElementById('btnExcluir').addEventListener('click', async () => {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const res  = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
    const json = await res.json();

    if (json.sucesso) {
      window.location.href = '/pages/produtos.html';
    } else {
      mostrarAlerta(json.mensagem || 'Erro ao excluir.');
    }
  } catch {
    mostrarAlerta('Erro de comunicação com o servidor.');
  }
});

carregarProduto();
