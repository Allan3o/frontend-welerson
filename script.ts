interface Produto {
  nome: string;
  preco: number;
  qtd: number;
}

let carrinho: Produto[] = JSON.parse(localStorage.getItem('carrinho') || '[]');

function salvarCarrinho(): void {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarContador(): void {
  const contador = document.getElementById('contador-carrinho');

  if (!contador) return;

  let totalItens: number = 0;

  carrinho.forEach((item) => {
    totalItens += item.qtd;
  });

  contador.textContent = totalItens.toString();
}

function atualizarCarrinho(): void {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total-carrinho');

  if (!lista || !total) return;

  lista.innerHTML = '';

  let soma: number = 0;

  carrinho.forEach((item) => {
    const li = document.createElement('li');

    li.className =
      'list-group-item d-flex justify-content-between align-items-center';

    const subtotal = item.preco * item.qtd;

    soma += subtotal;

    li.innerHTML = `
            ${item.nome} (x${item.qtd})
            <span>R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        `;

    lista.appendChild(li);
  });

  total.textContent = soma.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  atualizarContador();
}

document.querySelectorAll('.btn-comprar').forEach((botao) => {
  botao.addEventListener('click', function (this: Element) {
    const elemento = this as HTMLElement;
    const nome = (elemento as any).dataset.nome;
    const preco = parseFloat((elemento as any).dataset.preco);

    const qtdInput = elemento.parentElement?.querySelector(
      '.qtd-produto'
    ) as HTMLInputElement;
    const qtd = parseInt(qtdInput.value);

    const produtoExistente = carrinho.find((item) => item.nome === nome);

    if (produtoExistente) {
      produtoExistente.qtd += qtd;
    } else {
      carrinho.push({
        nome: nome,
        preco: preco,
        qtd: qtd,
      });
    }

    salvarCarrinho();
    atualizarCarrinho();

    mostrarToast();
  });
});

function mostrarToast(): void {
  const toastElemento = document.getElementById('toastCarrinho');

  if (!toastElemento) return;

  const toast = new (window as any).bootstrap.Toast(toastElemento);

  toast.show();
}

function limparCarrinho(): void {
  carrinho = [];

  salvarCarrinho();

  atualizarCarrinho();
}

function finalizarCompra(): void {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');

    return;
  }

  alert('Compra realizada com sucesso! 🛒');

  carrinho = [];

  salvarCarrinho();

  atualizarCarrinho();
}

interface Depoimento {
  name: string;
  body: string;
}

async function carregarDepoimentos(): Promise<void> {
  const container = document.getElementById('lista-depoimentos');

  if (!container) return;

  try {
    const resposta = await fetch(
      'https://jsonplaceholder.typicode.com/comments?_limit=3'
    );

    const dados: Depoimento[] = await resposta.json();

    dados.forEach((depoimento) => {
      const div = document.createElement('div');

      div.className = 'col-md-4';

      div.innerHTML = `
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h6 class="card-title">${depoimento.name}</h6>
                        <p class="card-text">${depoimento.body}</p>
                    </div>
                </div>
            `;

      container.appendChild(div);
    });
  } catch (_erro) {
    container.innerHTML = 'Erro ao carregar depoimentos.';
  }
}

atualizarCarrinho();
atualizarContador();
carregarDepoimentos();
