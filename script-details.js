function obterDetalhesProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch(`https://diwserver.vps.webdock.cloud/products/${id}`)
    .then((response) => response.json())
    .then((produto) => {
      mostrarDetalhes(produto);
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}

function mostrarDetalhes(produto) {
  // Criar um elemento para mostrar os detalhes do produto
  const detalhes = document.createElement("div");
  detalhes.classList.add("detalhes");

  // Adicionar a imagem destacada
  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;
  detalhes.appendChild(imagem);

  // Criar um contêiner para os detalhes do produto
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  const infoContainerHeading = document.createElement("div");
  infoContainerHeading.classList.add("info-container-heading");
  infoContainer.appendChild(infoContainerHeading);

  // Adicionar o título do produto
  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;
  infoContainerHeading.appendChild(titulo);

  const classificacao = exibirClassificacao(produto.rating.rate);
  infoContainerHeading.appendChild(classificacao);

  // Adicionar o preço do produto
  const preco = document.createElement("p");
  preco.classList.add("preco");
  preco.textContent = `Preço: R$ ${produto.price}`;
  infoContainer.appendChild(preco);

  // Adicionar a descrição do produto
  const descricao = document.createElement("p");
  descricao.innerHTML = produto.description;
  infoContainer.appendChild(descricao);

  detalhes.appendChild(infoContainer);

  // Adicionar o elemento de detalhes na página atual
  const container = document.querySelector(".container");
  container.appendChild(detalhes);
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

obterDetalhesProduto();
