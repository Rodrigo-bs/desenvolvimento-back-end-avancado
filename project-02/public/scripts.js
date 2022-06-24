const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

function addElement({ name, url }) {
    const ul = document.querySelector('.lista')
    const li = document.createElement('li')
    li.innerHTML = `${name} <a href="${url}" target="_blank"> ${url}`
    ul.appendChild(li)
       
}

function removeElement(element) {
    //...
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

    addElement({ name, url })

    // Limpa o Valor
    input.value = ''
})