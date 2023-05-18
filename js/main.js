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
    
    const existe = itens.find(elemento => elemento.nome === nome.value)

    
    
    const itemAltual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe) {
        itemAltual.id = existe.id;

        atualizaElemento(itemAltual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAltual;
    } else{
        itemAltual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0; ;

        criaElemento(itemAltual );

        itens.push(itemAltual);
    }
    
    

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';



})

function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDelete(item.id));       

    lista.appendChild(novoItem);
 
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDelete(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() { //nesse caso náo foi usado uma arrow function porque ela não carrega o "this"
        deleteElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deleteElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}

