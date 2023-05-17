const form = document.getElementById("novoItem"); //pega o id e joga em uma variavel
const lista = document.getElementById("lista"); //pega o id da ul e joga numa variavel
const itens = JSON.parse(localStorage.getItem("itens"))  || [];

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //interrompe o comportamento do evento padrão

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    
    const itemAltual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    criaElemento(itemAltual );


    itens.push(itemAltual);

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';



})

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    

    


    
}