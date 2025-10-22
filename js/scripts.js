/*----------- Modo claro/escuro ----------------*/
function alterarModo() {
    const icone = document.getElementById('icone-modo');

    if (icone.classList.contains('fa-moon')) {
        icone.classList.replace('fa-moon', 'fa-sun');
        //Gravando a escolha de modo escuro no localStorage
        localStorage.setItem('modo', 'escuro');
    }        
    else {
        icone.classList.replace('fa-sun', 'fa-moon');
        //Gravando a escolha de modo claro no localStorage
        localStorage.setItem('modo', 'claro'); 
    }       

    document.body.classList.toggle('dark-mode');
}   

/*---- verificando o modo salvo e carregando do localStorage ---*/
function carregarModo() {
    const modoSalvo = localStorage.getItem('modo');
    const icone = document.getElementById('icone-modo');

    if (modoSalvo == 'escuro') {
        document.body.classList.add('dark-mode');
        icone.classList.replace('fa-moon', 'fa-sun');
    }
    else {
        document.body.classList.remove('dark-mode');
        icone.classList.replace('fa-sun', 'fa-moon');
    }
}

/*--- Executando a função carregarModo() no carregamento da página --*/
carregarModo();

/*---------- Recolher / Ampliar menu lateral ----*/
function processarSideBar() {
    //Ocultar os nomes (textos) do menu
    const textos = document.getElementsByClassName('texto-menu');
    for (let i=0; i < textos.length; i++)
        textos[i].classList.toggle('texto-collapse');

    //Centralizar os ícones que sobraram na barra
    const menu = document.querySelectorAll('.sidebar nav');
    for (let i=0; i < menu.length; i++)
        menu[i].classList.toggle('icone-centralizado');

    //Reduzir o comprimento da barra lateral de menu
    const barra = document.getElementById('sidebar');
    barra.classList.toggle('collapsed');
}


/*--verificando se está logado antes de acessar a index------*/
function verificarLogin() {
    const logado = sessionStorage.getItem('logado') == 'true';
    const nome = sessionStorage.getItem('nome');

    if (!logado)
        window.location.href = 'login.html'; //manda para login.html
    else {
        const usuario = document.getElementById('usuario');
        usuario.innerText = `Olá ${nome}`;
    }
}

/*-----forçando verificação de login no carregamento da página----*/
window.onload = verificarLogin;


/*--------------- deslogar o usuário -----------------*/
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}