function carregarProdutos() {
  fetch("https://diwserver.vps.webdock.cloud/products")
    .then((response) => response.json())
    .then((data) => {
      exibirProdutos(data.products);
    })
    .catch((error) => console.error("Erro:", error));
}

function exibirProdutos(produtos) {
  const grid = document.querySelector(".grid");

  grid.innerHTML = "";

  if (produtos.length === 0) {
    // Caso o resultado seja vazio, exibir uma mensagem de aviso ou indicação visual
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nenhum produto encontrado.";
    grid.appendChild(mensagem);
  } else {
    produtos.forEach((produto) => {
      const item = document.createElement("div");
      item.classList.add("item");

      const imagem = document.createElement("img");
      imagem.src = produto.image;
      imagem.alt = produto.title;

      const nome = document.createElement("p");
      nome.textContent = produto.title;

      const preco = document.createElement("p");
      preco.textContent = `Preço: R$ ${produto.price}`;

      const categoria = document.createElement("span");
      categoria.classList.add("tag");
      categoria.textContent = produto.displayCategories;

      const classificacao = exibirClassificacao(produto.rating.rate);

      item.appendChild(classificacao);
      item.appendChild(imagem);
      item.appendChild(nome);
      item.appendChild(preco);
      // item.appendChild(categoria);

      // Adicionar manipulador de eventos para exibir detalhes ao clicar no item
      item.addEventListener("click", function () {
        exibirDetalhes(produto.id);
      });

      grid.appendChild(item);
    });
  }
}

function exibirClassificacao(rate) {
  const estrelas = document.createElement("div");
  estrelas.classList.add("classificacao");

  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("i");
    estrela.classList.add("fas", "fa-star");

    if (i <= rate) {
      estrela.classList.add("filled");
    }

    estrelas.appendChild(estrela);
  }

  return estrelas;
}

function exibirDetalhes(id) {
  const detalhesUrl = `details.html?id=${id}`;
  window.location.href = detalhesUrl;
}

function filtrarProdutosPorCategoria(categoria) {
  const url = `https://diwserver.vps.webdock.cloud/products/category/${categoria}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      exibirProdutos(data.products);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}

const categoriaSelect = document.getElementById("categorias");
categoriaSelect.addEventListener("change", function () {
  const categoriaSelecionada = categoriaSelect.value;
  filtrarProdutosPorCategoria(categoriaSelecionada);
});

function carregarCategorias() {
  fetch("https://diwserver.vps.webdock.cloud/products/categories")
    .then((response) => response.json())
    .then((data) => {
      const selectCategorias = document.getElementById("categorias");

      // Limpar as opções existentes no select
      selectCategorias.innerHTML = "";

      // Adicionar uma opção "Todas as categorias" no início
      const optionTodas = document.createElement("option");
      optionTodas.value = "";
      optionTodas.textContent = "Todas as categorias";
      selectCategorias.appendChild(optionTodas);

      // Adicionar as opções das categorias obtidas do backend
      data.forEach((categoria) => {
        const optionCategoria = document.createElement("option");
        optionCategoria.value = categoria;
        optionCategoria.textContent = categoria;
        selectCategorias.appendChild(optionCategoria);
      });

      // Adicionar event listener para filtrar produtos por categoria
      selectCategorias.addEventListener("change", function () {
        const categoriaSelecionada = selectCategorias.value;
        if (categoriaSelecionada === "") {
          carregarProdutos();
        } else {
          filtrarProdutosPorCategoria(categoriaSelecionada);
        }
      });
    })
    .catch((error) => console.error("Erro:", error));
}

const btnPesquisar = document.getElementById("search-button");
const campoPesquisa = document.getElementById("search-input");

btnPesquisar.addEventListener("click", function () {
  const query = campoPesquisa.value.trim();
  if (query !== "") {
    pesquisarProdutos(query);
  }
});

function pesquisarProdutos(query) {
  const url = `https://diwserver.vps.webdock.cloud/products/search?query=${encodeURIComponent(
    query
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      exibirProdutos(data);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}

carregarCategorias();

carregarProdutos();
