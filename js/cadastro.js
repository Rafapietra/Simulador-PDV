/*--- carregando dados do local storage para a tabela ---*/

function carregarTabela() {
    //pegando e limpando o tbody da tabela
    const tabela = document.getElementById('dadosProdutos');
    tabela.innerHTML = '';

    //Obtendo os dados de produtos do local storage
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];

    //Inserindo os dados obtidos na tabela
    for (let i=0; i<dados.length; i++)
        tabela.innerHTML += 
            `<tr>
                <td>${dados[i].nome}</td>
                <td>${dados[i].estoque}</td>
                <td>R$ ${dados[i].precoUnitario.toFixed(2)}</td>
                <td>${dados[i].categoria}</td>
                <td>
                    <i class="fa-solid fa-trash apagar"
                              onclick="apagarProduto(${dados[i].id})">
                    </i>
                </td>
            </tr>`;

}

/*----- carregando os dados para a tabela ----*/
carregarTabela();

/*---- função para obter o próximo Id de produto a ser salvo ----*/
function proximoId() {
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];
    dados.reverse();
    return dados[0].id + 1;
}

/*----- Salvar dados do form para a tabela e local storage ---*/
function salvarDados() {
    //Validar as entradas de dados
    if (
        frmProd.inNome.value.trim() == '' ||
        parseInt(frmProd.inEstoque.value) < 1 ||
        parseFloat(frmProd.inPreco.value) < 0.01
    )
    return false;

    //Pegando os dados do local storage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    //Criar novo objeto de produto
    let prod = {
        id: proximoId(),
        nome: frmProd.inNome.value,
        estoque: parseInt(frmProd.inEstoque.value),
        precoUnitario: parseFloat(frmProd.inPreco.value),
        categoria: frmProd.inCategoria.value
    }

    //Adicionar o novo produto ao vetor de dados
    produtos.push(prod);

    //Salvando o vetor atualizado no local storage
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

/*--- apagando produtos da tela e do local storage ---*/
function apagarProduto(id) {
    //obter os dados de produto
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    //Confirmar antes de excluir
    const item = produtos.filter(produto => produto.id == id);

    const confirmacao = 
        confirm(`Tem certeza que deseja excluir ${item[0].nome}`);

    if (!confirmacao)
        return false;

    //Obtendo todos os produtos, menos o excluído
    produtos = produtos.filter(produto => produto.id != id);

    //Salvando no local storage
    localStorage.setItem('produtos', JSON.stringify(produtos));

    //Recarregar os dados na tabela
    carregarTabela();
}