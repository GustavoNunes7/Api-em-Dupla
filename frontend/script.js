/*
=====================================
  FRONT-END — consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/


// ==============================
// ELEMENTOS DO HTML
// ==============================

// pega o elemento <img id="dogImage">
// será usado para mostrar a foto do cachorro
const movieImage = document.getElementById("movieImage");

// pega o elemento que mostra o nome da raça
const genName = document.getElementById("genName");

// botão que busca um cachorro aleatório
const randomBtn = document.getElementById("randomBtn");

// botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");

// campo de texto onde o usuário digita a raça
const genInput = document.getElementById("genInput");

// área onde fica a imagem do cachorro
// usamos querySelector porque é uma classe (.dog-area)
const movieArea = document.querySelector(".movie-area");


// ==============================
// URL DA NOSSA API
// ==============================

// endereço base da nossa API local
// localhost = computador do próprio usuário
// porta 3000 = onde o servidor Node está rodando
const API = "http://10.106.208.36:3000/api/filmes";


// ==============================Filme
// FUNÇÃO PRINCIPAL
// ==============================

// função assíncrona que busca um cachorro na API
// recebe uma URL como parâmetro
async function buscarFilme(url) {

    // adiciona a classe "loading"
    // normalmente usada para mostrar animação de carregamento
    movieArea.classList.add("loading");

    try {

        // faz a requisição HTTP para a API
        const response = await fetch(url);

        // converte a resposta para JSON
        const data = await response.json();

        // mostra no console a resposta da API
        console.log("Resposta da API:", data);

        // verifica se a API retornou erro
        if (data.status === "error") {

            // mostra a mensagem de erro na tela
            genName.textContent = data.message;

            // remove a imagem
            movieImage.src = "";

            // para a execução da função
            return;
        }

        // coloca a imagem do cachorro na tela
        // o src define qual imagem será exibida
        movieImage.src = data.message;

        // extrai o nome da raça da URL da imagem
        // exemplo da URL:
        // http://localhost:3000/fotos/husky/1.jpg

        // separa a URL em partes usando "/"
        const partes = data.message.split("/");

        // pega a posição 5 do array
        // que corresponde ao nome da raça
        const genero = partes[4];

        // coloca a primeira letra maiúscula
        // ex: husky → Husky
        genName.textContent =
            genero.charAt(0).toUpperCase() + genero.slice(1);

    } catch (erro) {

        // caso o servidor esteja desligado
        // ou aconteça algum erro na requisição

        // mostra erro no console
        console.error(erro);

        // mostra mensagem na tela
        genName.textContent =
            "⚠️ Servidor offline — rode: node server.js";

        // remove a imagem
        movieImage.src = "";

    } finally {

        // remove a classe de carregamento
        // independentemente de erro ou sucesso
        movieArea.classList.remove("loading");

    }

}


// ==============================
// AÇÕES
// ==============================


// função que busca um cachorro aleatório
function filmeAleatorio() {

    // chama a função principal
    // passando a rota /aleatorio da API
    buscarFilme(`${API}/aleatorio`);
}


// função que busca cachorro por raça
function buscarPorGenero() {

    // pega o texto digitado no input
    const genero = genInput.value.trim().toLowerCase();

    // verifica se o usuário digitou algo
    if (!genero) {

        // se não digitou, mostra alerta
        alert("Digite um  gênero de filme!");

        // interrompe a função
        return;
    }

    // chama a API passando a raça na URL
    // exemplo: /api/cachorros/husky
    buscarFilme(`${API}/${genero}`);
}

// ==============================
// EVENTOS
// ==============================

// quando clicar no botão "Aleatório"
randomBtn.addEventListener("click", filmeAleatorio);


// quando clicar no botão "Buscar"
searchBtn.addEventListener("click", buscarPorGenero);


// quando clicar na imagem do cachorro
// carrega outro cachorro aleatório
movieImage.addEventListener("click", filmeAleatorio);


// quando o usuário apertar ENTER no input
genInput.addEventListener("keypress", (event) => {

    // verifica se a tecla pressionada foi Enter
    if (event.key === "Enter") {

        // executa a busca por raça
        buscarPorGenero();
    }

});


// ==============================
// CARREGA AO ABRIR A PÁGINA
// ==============================


// assim que a página abre
// já busca um cachorro aleatório
filmeAleatorio();
