const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

function addElement(name, url) {
    const ul = document.querySelector('.lista');
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = url;
    a.innerText = name;

    const button = document.createElement('button');
    button.innerText = 'Remover';
    button.setAttribute('data-remover', '');

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
    
    const buttons = document.querySelectorAll('[data-remover]');

    buttons.forEach(button => {
        button.addEventListener('click', removeElement);
    });
}

function removeElement(element) {
    element.preventDefault();
    element.currentTarget.parentNode.remove();
}

function addSavedElements() {
    let valores = localStorage.getItem('links');

    if (valores) {
        valores = valores.split('-');
        
        valores.forEach(valor => {
            const valorDados = valor.split(',');

            const valoresObj = {
                nome: valorDados[0],
                url: valorDados[1],
            }

            addElement(valoresObj.nome, valoresObj.url);
        });
    }
}

function saveElements({ name, url }) {
    let link = [
        name,
        url
    ];

    let valores = localStorage.getItem('links');

    if (!valores) {
        localStorage.setItem('links', '');
        valores = localStorage.getItem('links');
    }

    let valorFinal = valores != '' ? valores + '-' + link.toString() : link.toString();
    localStorage.setItem('links', valorFinal);
}

form.addEventListener('submit', (event) => {
    // Retira a funcionalidade padrão do elemento clicado
    event.preventDefault();

    // Resgato o valor do input
    let { value } = input

    // Verifiando se o valor do input está vazio, caso esteja retorna um alerta
    if (!value) 
        return alert('Preencha o campo!')

    // Separa o value pela virgula, e retorna os valores para as váriaveis
    const [name, url] = value.split(',')

    // Verifica se a url foi escrita
    if (!url) 
        return alert('O texto não está formatado da maneira correta.')

    // Verifica se o http está presente no inicio da url
    if (!/^http/.test(url)) 
        return alert('Digite a url da maneira correta.')

    addElement(name, url)
    saveElements({ name, url });

    // Limpa o Valor
    input.value = ''
})

addSavedElements();