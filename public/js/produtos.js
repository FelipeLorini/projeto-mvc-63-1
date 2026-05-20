
document.querySelectorAll('.ano').forEach(el => el.textContent = new Date().getFullYear());

const loading       = document.getElementById('loading');
const vazio         = document.getElementById('vazio');
const tabelaWrapper = document.getElementById('tabelaWrapper');
const corpoTabela   = document.getElementById('corpoTabela');
const alerta        = document.getElementById('alerta');

function mostrarAlerta(mensagem, tipo = 'sucesso') {
  alerta.textContent = mensagem;
  alerta.className = `alert alert-${tipo}`;
  setTimeout(() => { alerta.className = 'alert hidden'; }, 3500);
}

function formatarPreco(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

async function carregarProdutos() {
  try {
    const res  = await fetch('/api/produtos');
    const json = await res.json();

    loading.classList.add('hidden');

    if (!json.sucesso || json.dados.length === 0) {
      vazio.classList.remove('hidden');
      return;
    }

    tabelaWrapper.classList.remove('hidden');
    corpoTabela.innerHTML = '';

    json.dados.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${produto.nome}</strong></td>
        <td><span class="badge">${produto.categoria}</span></td>
        <td>${formatarPreco(produto.preco)}</td>
        <td>${produto.quantidade} un.</td>
        <td class="acoes">
          <a href="/pages/detalhes.html?id=${produto._id}" class="btn btn-sm btn-info">Ver</a>
          <a href="/pages/editar.html?id=${produto._id}"   class="btn btn-sm btn-warning">Editar</a>
          <button class="btn btn-sm btn-danger" onclick="excluir('${produto._id}')">Excluir</button>
        </td>
      `;
      corpoTabela.appendChild(tr);
    });

  } catch (err) {
    loading.classList.add('hidden');
    mostrarAlerta('Erro ao conectar com a API. Verifique o servidor.', 'erro');
  }
}

async function excluir(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const res  = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
    const json = await res.json();

    if (json.sucesso) {
      mostrarAlerta('Produto excluído com sucesso!', 'sucesso');
      carregarProdutos();
    } else {
      mostrarAlerta(json.mensagem || 'Erro ao excluir.', 'erro');
    }
  } catch {
    mostrarAlerta('Erro de comunicação com o servidor.', 'erro');
  }
}

carregarProdutos();
