const form = document.querySelector('form')

async function addElement(element) {
    const myFetch = await fetch('http://localhost:5000/?name='+element.nameValue+'&url='+element.urlValue)
        .then(r => r.status)
        .then(r => {
            if (r == 200) {
                alert('Adicionado com Sucesso!');
                limparInputs();
            } else {
                alert('Algo correu Errado!');
                limparInputs();
            }
        })

    writeElement();
}

async function removeElement(element) {
    const url = element.currentTarget.parentNode.querySelector('a').getAttribute('url');
    const name = element.currentTarget.parentNode.querySelector('a').getAttribute('name');

    console.log('http://localhost:5000/?name='+name+'&url='+url+'&del=1')

    const myFetch = await fetch('http://localhost:5000/?name='+name+'&url='+url+'&del=1')
        .then(r => r.status)
        .then(r => {
            if (r == 200) {
                alert('Deletado com Sucesso!');
            } else {
                alert('Algo correu Errado!');
            }
        });

    writeElement();
}

// Função responsavel por recuperar os dados do arquivo json e chamar minha função appendElementInMyUl
function writeElement() {
    fetch('http://localhost:5000/')
        .then(r => r.json())
        .then(r => {
            appendElementInMyUl(r.urls);
            })
}

// Função responsavel por criar meus elementos e inserir dentro da minha ul
function appendElementInMyUl(urls) {
    const ul = document.querySelector('[data-ul="container"]')
    
    // limpo o conteudo da ul
    ul.innerHTML = '';

    // Para cada url, crio uma li, um a, um button e depois insiro dentro da minha ul
    urls.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('url-item');

        const a = document.createElement('a');
        a.setAttribute('url', item.url)
        a.setAttribute('name', item.name)
        a.innerText = item.name;
        a.href = item.url;

        const button = document.createElement('button');
        button.classList.add('url-button');
        button.innerText = 'Deletar';

        li.appendChild(a);
        li.appendChild(button);
        ul.appendChild(li);
    });

    // Seleciono todos os botões e adiciono em cada um, um evento de click.
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', removeElement)
    })
}

// Função que limpa meus inputs
function limparInputs() {
    form.querySelector('input[name="name"]').value = '';
    form.querySelector('input[name="url"]').value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValue = form.querySelector('input[name="name"]').value;
    const urlValue = form.querySelector('input[name="url"]').value;

    if (!nameValue && !urlValue) {
        alert('Preencha os campos!');
    } else {
        addElement({ nameValue, urlValue });
    }
})

writeElement();