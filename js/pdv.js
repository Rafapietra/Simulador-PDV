/*---------- função para carregar os produtos ------*/

function carregarProdutos() {
    //Pegando a div onde os produtos serão inseridos
    const divProd = document.getElementById('resumo-prod-content');
    divProd.innerHTML = '';

    //Pegando os produtos do localStorage
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];

    //Inserindo os dados na resumo-prod-content
    for (let i=0; i<dados.length; i++)
        divProd.innerHTML += `
            <div class="resumo-prod-item">
                <div>
                    <span>${dados[i].nome}</span>
                    <span> - R$ ${dados[i].precoUnitario.toFixed(2)}</span>
                </div>
                <div>
                    <i class="fa-solid fa-cart-plus icone-acao"
                    onclick="adicionarProduto(${dados[i].id});"></i>
                </div>
            </div>
        `;
}

/*----------- chamando a execução da carregarProdutos() -------*/
carregarProdutos();

/*------- Array em memória para controlar dados do cupom ------*/
let cupom = [];

/*------- Função para carregar na tela os dados do cupom ------*/

function carregarCupom() {
    //pegando a div onde os dados do cupom serão inseridos
    let divCupom = document.getElementById('resumo-cupom-content');
    divCupom.innerHTML = '';

    //Inserindo na tela os dado do array de cupom
    for (let i=0; i<cupom.length; i++)
        divCupom.innerHTML += `
            <div class="resumo-cupom-item">
                <div class="w25">
                    <i class="fa-solid fa-trash icone-acao"
                       onclick="removerProduto(${cupom[i].id});">
                    </i>
                </div>
                <div class="esquerda">
                    <span>${cupom[i].quantidade}</span>
                    <span>
                        ${cupom[i].nome}
                        (${cupom[i].preco.toFixed(2)})
                    </span>
                </div>
                <div class="w120dir">
                    R$ ${cupom[i].total.toFixed(2)}
                </div>
            </div>
        `;
}

/*-------- Função para adicionar produto ao cupom --------*/

function adicionarProduto(id) {
    //pegar os dados de produtos do localStorage
    let dados = JSON.parse(localStorage.getItem('produtos')) || [];

    //Obter o produto clicado
    let produto = dados.filter(p => p.id == id)[0];

    //Tentando achar o produto no cupom
    let produtoExistente = cupom.find(p => p.id == id);

    //Se o produto não existir no cupom, adiciona
    if (!produtoExistente) {
        cupom.push(
            {
                id: produto.id,
                nome: produto.nome,
                preco: produto.precoUnitario,
                quantidade: 1,
                total: produto.precoUnitario * 1
            }
        );
    }
    //Senão (se já existir), atualizar a quantidade e o total
    else {
        produtoExistente.quantidade++;  //recebe +1
        produtoExistente.total =
            produtoExistente.preco * produtoExistente.quantidade;
    }

    //Recarrega na tela os dados do cupom
    carregarCupom();
    atualizarTotais();
}

/*-------- Função para calcular o total das vendas --------*/

function calcularTotalVendas(){
    let total = 0;

    for(let i=0; i<cupom.length; i++)
    total += cupom[i].total;

    return total;
}

function calcularDesconto(valor){
    let desconto = 0;

    if(valor >= 5000)
     desconto = valor * 5/100;
    else
    if (valor >= 2000)
     desconto = valor * 3/100;
    else
    if (valor >= 1000)
     desconto = valor * 1/100;

    return desconto;
}

/*-------- Função para atualizar totais --------*/

function atualizarTotais() {
    //Obtendo os cards para atulizar os totais
    let tProdutos = document.getElementById('tProdutos');
    let tDescontos = document.getElementById('tDescontos');
    let tTotal = document.getElementById('tTotal');

    //Calculando os Totais
    let totalVendas = calcularTotalVendas();
    let totalDescontos = calcularDesconto(totalVendas);
    let totalFinal = totalVendas - totalDescontos;

    //Atualizar os valores dos cards
    tProdutos.innerText = `R$ ${totalVendas.toFixed(2)}`;
    tDescontos.innerText = `R$ ${totalDescontos.toFixed(2)}`;
    tTotal.innerText = `R$ ${totalFinal.toFixed(2)}`;
}

/*---------- função para remover produtos do cupom*/

function removerProduto(id){
    //remove o produto do cupom
    cupom = cupom.filter(p => p.id != id);

   //recarrega o cupom e atualiza os totais
   carregarCupom();
   atualizarTotais(); 
}