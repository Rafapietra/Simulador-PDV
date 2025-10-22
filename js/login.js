/*--------- validando o login do usuário ----------*/
function validarLogin() {
    //Simular consulta a banco de dados de usuários
    const _login = 'admin';
    const _senha = 'admin';
    const _nome = 'Pafúncio';

    //Obtendo os dados digitados no formulário
    const login = document.getElementById('inLogin').value;
    const senha = document.getElementById('inSenha').value;

    //Validando o login
    if (login.toLowerCase() == _login && senha.toLowerCase() == _senha) {
        //Armazenar os dados do usuário logado no SessionStorage
        sessionStorage.setItem('logado', 'true');
        sessionStorage.setItem('nome', _nome);
        
        //Redireciona para a página index.html
        window.location.href = 'index.html';
        return false;
    } else {
        //Exibindo a mensagem de erro
        const erro = document.getElementById('erro');
        erro.style.display = 'block';
        return false;
    }

}